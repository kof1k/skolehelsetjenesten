import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  classLevel: text("class_level").notNull(),
  appointmentDate: date("appointment_date").notNull(),
  timeSlot: text("time_slot").notNull(),
  reason: text("reason").notNull(),
  additionalNotes: text("additional_notes"),
  status: text("status").notNull().default("pending"),
  nurseId: text("nurse_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const appointmentFormSchema = z.object({
  studentName: z.string().min(2, "Navn må ha minst 2 tegn"),
  classLevel: z.string().min(1, "Velg klasse"),
  appointmentDate: z.string().min(1, "Velg dato"),
  timeSlot: z.string().min(1, "Velg tidspunkt"),
  reason: z.string().min(1, "Velg årsak"),
  additionalNotes: z.string().optional(),
  nurseId: z.string().optional(),
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
