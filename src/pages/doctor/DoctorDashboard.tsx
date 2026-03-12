import { useState } from "react";
import { Calendar, Video, MessageSquare, User, Clock, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAppointments, type Appointment } from "@/data/users";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function DoctorDashboard() {
  const [availability, setAvailability] = useState<Record<string, boolean>>({
    "Mon-9:00 AM": true, "Mon-10:00 AM": true, "Mon-11:00 AM": true,
    "Tue-10:00 AM": true, "Tue-2:00 PM": true, "Tue-3:00 PM": true,
    "Wed-9:00 AM": true, "Wed-11:00 AM": true,
    "Thu-2:00 PM": true, "Thu-3:00 PM": true, "Thu-4:00 PM": true,
    "Fri-9:00 AM": true, "Fri-10:00 AM": true,
  });
  const [appointments] = useState<Appointment[]>(mockAppointments);

  const toggleSlot = (key: string) => {
    setAvailability((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const typeIcon = { video: Video, chat: MessageSquare, "in-person": User };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Manage your schedule and appointments</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Availability Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Weekly Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-1 min-w-[500px]">
                <div className="text-xs font-medium text-muted-foreground p-1" />
                {weekDays.map((d) => (
                  <div key={d} className="text-xs font-semibold text-center p-1">{d}</div>
                ))}
                {timeSlots.map((time) => (
                  <>
                    <div key={time} className="text-xs text-muted-foreground p-1 whitespace-nowrap">{time}</div>
                    {weekDays.map((day) => {
                      const key = `${day}-${time}`;
                      const active = availability[key];
                      return (
                        <button
                          key={key}
                          onClick={() => toggleSlot(key)}
                          className={`h-8 rounded text-xs transition-colors ${
                            active ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          }`}
                        >
                          {active ? "✓" : ""}
                        </button>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Click slots to toggle availability</p>
          </CardContent>
        </Card>

        {/* Appointments Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments.map((apt) => {
              const Icon = typeIcon[apt.type];
              return (
                <div key={apt.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-doctor/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-doctor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{apt.patientName}</h4>
                    <p className="text-xs text-muted-foreground">{apt.time} • {apt.reason}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant={apt.status === "completed" ? "secondary" : "default"} className="text-xs">
                      {apt.type}
                    </Badge>
                    {apt.status === "upcoming" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-success"><Check className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive"><X className="h-4 w-4" /></Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Telemedicine Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button className="gap-2"><Video className="h-4 w-4" /> Start Video Call</Button>
          <Button variant="outline" className="gap-2"><MessageSquare className="h-4 w-4" /> Open Chat</Button>
          <Button variant="secondary" className="gap-2"><Calendar className="h-4 w-4" /> View Full Schedule</Button>
        </CardContent>
      </Card>
    </div>
  );
}
