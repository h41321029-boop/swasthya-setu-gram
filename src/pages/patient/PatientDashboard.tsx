import { useNavigate } from "react-router-dom";
import {
  HeartPulse, Stethoscope, Pill, ShieldAlert, Flower2, Apple,
  Lightbulb, Phone, Calendar, Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/components/layout/AppShell";
import { t } from "@/i18n/translations";
import { Badge } from "@/components/ui/badge";

const features = [
  { path: "/medi-tools", icon: HeartPulse, labelKey: "mediTools", color: "bg-primary/10 text-primary", desc: "BMI, BP, Routine" },
  { path: "/telemedicine", icon: Stethoscope, labelKey: "telemedicine", color: "bg-doctor/10 text-doctor", desc: "On-demand doctors" },
  { path: "/pharmacy", icon: Pill, labelKey: "pharmacy", color: "bg-pharmacist/10 text-pharmacist", desc: "Order medicines" },
  { path: "/addiction-recovery", icon: ShieldAlert, labelKey: "addictionRecovery", color: "bg-asha/10 text-asha", desc: "Recovery support" },
  { path: "/womens-health", icon: Flower2, labelKey: "womensHealth", color: "bg-pink-100 text-pink-600", desc: "Private health tracking" },
  { path: "/diet-tracker", icon: Apple, labelKey: "dietTracker", color: "bg-success/10 text-success", desc: "Nutrition & fasting" },
  { path: "/health-tips", icon: Lightbulb, labelKey: "healthTips", color: "bg-warning/10 text-warning", desc: "AI health advice" },
  { path: "/emergency", icon: Phone, labelKey: "emergency", color: "bg-sos/10 text-sos", desc: "Emergency help" },
];

export default function PatientDashboard() {
  const { language } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Welcome */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-serif font-bold">
          {t("welcome", language)}! 🙏
        </h1>
        <p className="text-muted-foreground">Your health, your way — all in one place.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center p-4">
          <Activity className="h-6 w-6 mx-auto text-primary mb-1" />
          <p className="text-2xl font-bold">7,240</p>
          <p className="text-xs text-muted-foreground">Steps Today</p>
        </Card>
        <Card className="text-center p-4">
          <HeartPulse className="h-6 w-6 mx-auto text-sos mb-1" />
          <p className="text-2xl font-bold">120/80</p>
          <p className="text-xs text-muted-foreground">Last BP</p>
        </Card>
        <Card className="text-center p-4">
          <Calendar className="h-6 w-6 mx-auto text-doctor mb-1" />
          <p className="text-2xl font-bold">2</p>
          <p className="text-xs text-muted-foreground">Appointments</p>
        </Card>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {features.map((f) => (
          <Card
            key={f.path}
            className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => navigate(f.path)}
          >
            <CardContent className="flex flex-col items-center text-center p-5 space-y-3">
              <div className={`flex items-center justify-center h-14 w-14 rounded-xl ${f.color}`}>
                <f.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t(f.labelKey, language)}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointment */}
      <Card className="border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-doctor/10 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-doctor" />
              </div>
              <div>
                <h4 className="font-semibold">Dr. Priya Sharma</h4>
                <p className="text-sm text-muted-foreground">General Physician • Today 10:00 AM</p>
              </div>
            </div>
            <Badge variant="success">Upcoming</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
