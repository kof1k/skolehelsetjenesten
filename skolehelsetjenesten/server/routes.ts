import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { appointmentFormSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

function requireNurseOrAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.session.role !== "nurse" && req.session.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, role } = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Brukernavn er allerede tatt" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        role: role || "student",
      });

      res.status(201).json({ 
        id: user.id, 
        username: user.username, 
        role: user.role 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Brukernavn og passord kreves" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Ugyldig brukernavn eller passord" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Ugyldig brukernavn eller passord" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      res.json({ 
        id: user.id, 
        username: user.username, 
        role: user.role 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({
      id: req.session.userId,
      username: req.session.username,
      role: req.session.role,
    });
  });

  app.get("/api/appointments", requireNurseOrAdmin, async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.get("/api/appointments/:id", requireNurseOrAdmin, async (req, res) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = appointmentFormSchema.parse(req.body);
      const appointment = await storage.createAppointment({
        studentName: validatedData.studentName,
        classLevel: validatedData.classLevel,
        appointmentDate: validatedData.appointmentDate,
        timeSlot: validatedData.timeSlot,
        reason: validatedData.reason,
        additionalNotes: validatedData.additionalNotes || null,
        nurseId: validatedData.nurseId || null,
      });
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  app.patch("/api/appointments/:id/status", requireNurseOrAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !["pending", "confirmed", "cancelled", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const appointment = await storage.updateAppointmentStatus(req.params.id, status);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update appointment status" });
    }
  });

  app.delete("/api/appointments/:id", requireNurseOrAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteAppointment(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete appointment" });
    }
  });

  app.post("/api/seed-nurses", async (req, res) => {
    try {
      const nurses = [
        { username: "marianne", password: "helse2024", role: "nurse" },
        { username: "hanne", password: "helse2024", role: "nurse" },
      ];

      const created = [];
      for (const nurse of nurses) {
        const existing = await storage.getUserByUsername(nurse.username);
        if (!existing) {
          const hashedPassword = await bcrypt.hash(nurse.password, 10);
          const user = await storage.createUser({
            username: nurse.username,
            password: hashedPassword,
            role: nurse.role,
          });
          created.push({ username: user.username, role: user.role });
        }
      }

      res.json({ message: "Nurses seeded", created });
    } catch (error) {
      res.status(500).json({ message: "Failed to seed nurses" });
    }
  });

  return httpServer;
}
