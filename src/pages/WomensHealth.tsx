import { useState } from "react";
import { Flower2, Calendar as CalIcon, Heart, BookOpen, ArrowLeft, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function WomensHealth() {
  const navigate = useNavigate();
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriod, setLastPeriod] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Simple fertility calc
  const ovulationDay = cycleLength - 14;
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;

  const educationCards = [
    { title: "PCOD Awareness", desc: "Understanding Polycystic Ovary Disease — symptoms, causes, and management", icon: "🩺", color: "bg-pink-50 border-pink-200" },
    { title: "Breast Cancer", desc: "Early detection, self-examination guide, and when to consult a doctor", icon: "🎗️", color: "bg-rose-50 border-rose-200" },
    { title: "Prenatal Care", desc: "Essential nutrition, exercise, and check-ups during pregnancy", icon: "🤰", color: "bg-purple-50 border-purple-200" },
    { title: "Menopause Guide", desc: "Managing symptoms and maintaining health during menopause", icon: "🌸", color: "bg-pink-50 border-pink-200" },
  ];

  // Calendar mock - current month days
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const periodDays = [3, 4, 5, 6, 7]; // mock
  const fertileDays = [12, 13, 14, 15, 16, 17];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Women's Health</h1>
          <p className="text-muted-foreground">Private & secure health tracking</p>
        </div>
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 flex items-center gap-2 text-sm text-pink-800">
        <Flower2 className="h-4 w-4 shrink-0" />
        Your data is private and never shared. Only you can see your tracking data.
      </div>

      <Tabs defaultValue="cycle" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cycle"><CalIcon className="h-4 w-4 mr-1" /> Cycle</TabsTrigger>
          <TabsTrigger value="fertility"><Heart className="h-4 w-4 mr-1" /> Fertility</TabsTrigger>
          <TabsTrigger value="education"><BookOpen className="h-4 w-4 mr-1" /> Learn</TabsTrigger>
        </TabsList>

        <TabsContent value="cycle">
          <Card>
            <CardHeader><CardTitle className="text-lg">Menstrual Cycle Calendar</CardTitle></CardHeader>
            <CardContent>
              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="text-xs font-semibold text-muted-foreground p-1">{d}</div>
                ))}
                {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const isPeriod = periodDays.includes(day);
                  const isFertile = fertileDays.includes(day);
                  const isToday = day === today.getDate();
                  return (
                    <button
                      key={day}
                      className={`h-9 w-9 mx-auto rounded-full text-sm transition-colors ${
                        isPeriod ? "bg-destructive/20 text-destructive font-semibold" :
                        isFertile ? "bg-success/20 text-success font-semibold" :
                        isToday ? "bg-primary text-primary-foreground font-semibold" :
                        "hover:bg-muted"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-destructive/20" /> Period</span>
                <span className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-success/20" /> Fertile</span>
                <span className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-primary" /> Today</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fertility">
          <Card>
            <CardHeader><CardTitle className="text-lg">Fertility / Safe-Day Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cycle Length (days)</Label>
                  <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)} />
                </div>
                <div className="space-y-2">
                  <Label>Last Period Start</Label>
                  <Input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
                </div>
              </div>
              <Button className="w-full" onClick={() => setShowResults(true)}>Calculate</Button>

              {showResults && (
                <div className="space-y-3 pt-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <Card className="p-3 bg-success/5 border-success/20">
                      <p className="text-2xl font-bold text-success">Day {ovulationDay}</p>
                      <p className="text-xs text-muted-foreground">Ovulation</p>
                    </Card>
                    <Card className="p-3 bg-warning/5 border-warning/20">
                      <p className="text-2xl font-bold text-warning">Day {fertileStart}-{fertileEnd}</p>
                      <p className="text-xs text-muted-foreground">Fertile Window</p>
                    </Card>
                    <Card className="p-3 bg-primary/5 border-primary/20">
                      <p className="text-2xl font-bold text-primary">Day 1-{fertileStart - 1}</p>
                      <p className="text-xs text-muted-foreground">Safe Days</p>
                    </Card>
                  </div>
                  {/* Visual bar */}
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div className="bg-primary/20 flex-[5]" title="Safe" />
                    <div className="bg-warning/30 flex-[6]" title="Fertile" />
                    <div className="bg-success/30 flex-[1]" title="Ovulation" />
                    <div className="bg-primary/20 flex-[16]" title="Safe" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Day 1</span><span>Fertile Window</span><span>Day {cycleLength}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          {educationCards.map((card) => (
            <Card key={card.title} className={`${card.color} hover:shadow-md transition-shadow cursor-pointer`}>
              <CardContent className="p-5 flex items-start gap-4">
                <span className="text-3xl">{card.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{card.desc}</p>
                  <Button size="sm" variant="outline" className="mt-3 gap-1">
                    <Stethoscope className="h-4 w-4" /> Consult Gynecologist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
