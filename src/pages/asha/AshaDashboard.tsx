import { useState } from "react";
import { AlertTriangle, MapPin, HeartPulse, Droplets, Activity, CheckCircle2, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { criticalPatients, type CriticalPatient } from "@/data/users";

export default function AshaDashboard() {
  const [patients] = useState<CriticalPatient[]>(criticalPatients);
  const [vitalsForm, setVitalsForm] = useState({ bp: "", spo2: "", sugar: "" });
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const tasks = [
    "Visit Ramabai Patil — check sugar levels",
    "Administer ORS to Lakshmi Devi",
    "Collect BP reading from Shankar Jadhav",
    "Update vaccination records — Ward 3",
    "Deliver medicines to Wadgaon PHC",
  ];

  const severityColor = {
    critical: "destructive" as const,
    serious: "warning" as const,
    moderate: "secondary" as const,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold">ASHA Worker Dashboard</h1>
        <p className="text-muted-foreground">Community health monitoring — Wadgaon cluster</p>
      </div>

      {/* Proximity Alerts */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Proximity Alerts — Critical Patients Nearby
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patients.filter((p) => p.severity === "critical").map((p) => (
            <div key={p.id} className="flex items-start gap-3 p-3 bg-background rounded-lg border border-destructive/20">
              <div className="h-10 w-10 rounded-full bg-sos/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-sos" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold">{p.name}</h4>
                  <Badge variant={severityColor[p.severity]}>{p.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{p.condition}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.village}</span>
                  <span>BP: {p.vitals.bp}</span>
                  <span>SpO₂: {p.vitals.spo2}%</span>
                  <span>Sugar: {p.vitals.sugar} mg/dL</span>
                </div>
              </div>
              <Button size="sm" variant="destructive">Visit Now</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <HeartPulse className="h-5 w-5 text-primary" />
              All Monitored Patients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {patients.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <div>
                  <h4 className="font-medium text-sm">{p.name}</h4>
                  <p className="text-xs text-muted-foreground">{p.condition} • Last: {p.lastVisit}</p>
                </div>
                <Badge variant={severityColor[p.severity]}>{p.severity}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="h-5 w-5 text-primary" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((task, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={checklist[task] || false}
                  onChange={() => setChecklist((c) => ({ ...c, [task]: !c[task] }))}
                  className="h-5 w-5 rounded accent-primary"
                />
                <span className={`text-sm ${checklist[task] ? "line-through text-muted-foreground" : ""}`}>{task}</span>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Vitals Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Record Patient Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Blood Pressure (mmHg)</Label>
              <Input placeholder="120/80" value={vitalsForm.bp} onChange={(e) => setVitalsForm((f) => ({ ...f, bp: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>SpO₂ (%)</Label>
              <Input type="number" placeholder="98" value={vitalsForm.spo2} onChange={(e) => setVitalsForm((f) => ({ ...f, spo2: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Blood Sugar (mg/dL)</Label>
              <Input type="number" placeholder="100" value={vitalsForm.sugar} onChange={(e) => setVitalsForm((f) => ({ ...f, sugar: e.target.value }))} />
            </div>
          </div>
          <Button className="mt-4 gap-2"><CheckCircle2 className="h-4 w-4" /> Save Vitals</Button>
        </CardContent>
      </Card>
    </div>
  );
}
