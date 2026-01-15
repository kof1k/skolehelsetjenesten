import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { appointmentFormSchema, type AppointmentFormData } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CalendarIcon, Clock, CheckCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";

const classLevels = [
  "Vg1",
  "Vg2",
  "Vg3",
  "Påbygg",
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
];

const reasons = [
  "Samtale om psykisk helse",
  "Samtale om fysisk helse",
  "Prevensjon og seksualitet",
  "Testing for kjønnssykdommer",
  "Generell helseutfordring",
  "Annet",
];

const nurses = [
  { id: "marianne", name: "Marianne Buvik" },
  { id: "hanne", name: "Hanne Krøtøy" },
];

export function AppointmentForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      studentName: "",
      classLevel: "",
      appointmentDate: "",
      timeSlot: "",
      reason: "",
      additionalNotes: "",
      nurseId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Time bestilt!",
        description: "Din forespørsel er sendt. Du vil motta bekreftelse.",
      });
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
    },
    onError: (error) => {
      toast({
        title: "Feil",
        description: error.message || "Kunne ikke bestille time. Prøv igjen senere.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto border">
        <CardContent className="py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Takk for din bestilling!</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Vi har mottatt din forespørsel og vil kontakte deg for å bekrefte timen.
          </p>
          <Button onClick={() => { setSubmitted(false); form.reset(); }} data-testid="button-book-another">
            Bestill en ny time
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto border" data-testid="card-appointment-form">
      <CardHeader>
        <CardTitle className="text-2xl">Bestill time</CardTitle>
        <CardDescription>
          Fyll ut skjemaet under for å bestille time hos helsesykepleier.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Navn</FormLabel>
                    <FormControl>
                      <Input placeholder="Ditt fulle navn" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klasse</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-class">
                          <SelectValue placeholder="Velg klasse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nurseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Helsesykepleier (valgfritt)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-nurse">
                        <SelectValue placeholder="Ingen preferanse" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nurses.map((nurse) => (
                        <SelectItem key={nurse.id} value={nurse.id}>
                          {nurse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Dato</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal justify-start",
                              !field.value && "text-muted-foreground"
                            )}
                            data-testid="button-date-picker"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(new Date(field.value), "PPP", { locale: nb })
                            ) : (
                              <span>Velg dato</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                          disabled={(date) =>
                            date < new Date() || date.getDay() === 0 || date.getDay() === 6
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tidspunkt</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-time">
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Velg tid" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Årsak til time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-reason">
                        <SelectValue placeholder="Velg årsak" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tilleggsinformasjon (valgfritt)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Er det noe mer du vil fortelle oss?"
                      className="resize-none"
                      {...field}
                      data-testid="textarea-notes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={mutation.isPending}
              data-testid="button-submit-appointment"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sender...
                </>
              ) : (
                "Bestill time"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
