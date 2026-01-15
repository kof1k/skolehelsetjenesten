import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Appointment } from "@shared/schema";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  FileText, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Trash2,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

type User = {
  id: string;
  username: string;
  role: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

const statusLabels: Record<string, string> = {
  pending: "Venter",
  confirmed: "Bekreftet",
  cancelled: "Avlyst",
  completed: "Fullført",
};

const reasonLabels: Record<string, string> = {
  helseprat: "Helseprat",
  vaksinering: "Vaksinering",
  sykemelding: "Sykemelding",
  annet: "Annet",
};

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: user, isLoading: userLoading, error: userError } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
    enabled: !!user,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/appointments/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Status oppdatert",
        description: "Timeavtalen er oppdatert.",
      });
    },
    onError: () => {
      toast({
        title: "Feil",
        description: "Kunne ikke oppdatere status.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/appointments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Slettet",
        description: "Timeavtalen er slettet.",
      });
    },
    onError: () => {
      toast({
        title: "Feil",
        description: "Kunne ikke slette timeavtalen.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout", {});
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/logg-inn");
    },
  });

  useEffect(() => {
    if (userError) {
      setLocation("/logg-inn");
    }
  }, [userError, setLocation]);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredAppointments = appointments.filter((apt) => 
    statusFilter === "all" ? true : apt.status === statusFilter
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Administrasjon</h1>
              <p className="text-muted-foreground">
                Velkommen, {user.username}! Du er logget inn som {user.role === "nurse" ? "helsesykepleier" : "administrator"}.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => logoutMutation.mutate()}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logg ut
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Totalt</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <p className="text-sm text-muted-foreground">Venter</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                <p className="text-sm text-muted-foreground">Bekreftet</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
                <p className="text-sm text-muted-foreground">Fullført</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Timeavtaler</CardTitle>
                  <CardDescription>Administrer alle bestilte timer</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
                      <SelectValue placeholder="Filtrer etter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle</SelectItem>
                      <SelectItem value="pending">Venter</SelectItem>
                      <SelectItem value="confirmed">Bekreftet</SelectItem>
                      <SelectItem value="cancelled">Avlyst</SelectItem>
                      <SelectItem value="completed">Fullført</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Ingen timeavtaler funnet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded-lg p-4 hover-elevate"
                      data-testid={`card-appointment-${appointment.id}`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-lg">{appointment.studentName}</span>
                            <Badge variant="secondary">{appointment.classLevel}</Badge>
                            <Badge className={statusColors[appointment.status]}>
                              {statusLabels[appointment.status]}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(appointment.appointmentDate), "d. MMMM yyyy", { locale: nb })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {appointment.timeSlot}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {reasonLabels[appointment.reason] || appointment.reason}
                            </span>
                          </div>
                          {appointment.additionalNotes && (
                            <div className="flex items-start gap-1 text-sm">
                              <FileText className="w-4 h-4 mt-0.5 text-muted-foreground" />
                              <span>{appointment.additionalNotes}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Select
                            value={appointment.status}
                            onValueChange={(status) => 
                              updateStatusMutation.mutate({ id: appointment.id, status })
                            }
                          >
                            <SelectTrigger 
                              className="w-[140px]"
                              data-testid={`select-status-${appointment.id}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">
                                <span className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                                  Venter
                                </span>
                              </SelectItem>
                              <SelectItem value="confirmed">
                                <span className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  Bekreft
                                </span>
                              </SelectItem>
                              <SelectItem value="completed">
                                <span className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-blue-500" />
                                  Fullført
                                </span>
                              </SelectItem>
                              <SelectItem value="cancelled">
                                <span className="flex items-center gap-2">
                                  <XCircle className="w-4 h-4 text-red-500" />
                                  Avlys
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteMutation.mutate(appointment.id)}
                            data-testid={`button-delete-${appointment.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
