import { useState } from "react";
import { Calculator, HeartPulse, Footprints, Droplets, Moon, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { sampleBPReadings } from "@/data/healthRecords";

export default function MediTools() {
  const navigate = useNavigate();
  // BMI
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  // BP
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [bpReadings, setBpReadings] = useState(sampleBPReadings);

  // Routine
  const [steps, setSteps] = useState(7240);
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(5);

  const calcBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) setBmi(parseFloat((w / (h * h)).toFixed(1)));
  };

  const bmiCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "bg-warning/20 text-warning" };
    if (b < 25) return { label: "Normal", color: "bg-success/20 text-success" };
    if (b < 30) return { label: "Overweight", color: "bg-warning/20 text-warning" };
    return { label: "Obese", color: "bg-destructive/20 text-destructive" };
  };

  const getBPStatus = (s: number, d: number) => {
    if (s < 120 && d < 80) return { label: "Normal", color: "success" as const };
    if (s < 130 && d < 80) return { label: "Elevated", color: "warning" as const };
    if (s < 140 || d < 90) return { label: "High", color: "destructive" as const };
    return { label: "Crisis", color: "destructive" as const };
  };

  const addBPReading = () => {
    const s = parseInt(systolic);
    const d = parseInt(diastolic);
    if (s > 0 && d > 0) {
      const status = getBPStatus(s, d);
      const newReading = { date: "Now", systolic: s, diastolic: d, status: status.label.toLowerCase() as any };
      setBpReadings([...bpReadings, newReading]);
      setSystolic("");
      setDiastolic("");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Medi-Tools</h1>
          <p className="text-muted-foreground">Track your health vitals</p>
        </div>
      </div>

      <Tabs defaultValue="bmi" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bmi" className="gap-1"><Calculator className="h-4 w-4" /> BMI</TabsTrigger>
          <TabsTrigger value="bp" className="gap-1"><HeartPulse className="h-4 w-4" /> BP</TabsTrigger>
          <TabsTrigger value="routine" className="gap-1"><Footprints className="h-4 w-4" /> Routine</TabsTrigger>
        </TabsList>

        {/* BMI Calculator */}
        <TabsContent value="bmi">
          <Card>
            <CardHeader><CardTitle>BMI Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (cm)</Label>
                  <Input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input type="number" placeholder="65" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
              </div>
              <Button onClick={calcBMI} className="w-full" size="lg">Calculate BMI</Button>

              {bmi !== null && (
                <div className="text-center space-y-3 pt-4">
                  <p className="text-5xl font-bold text-primary">{bmi}</p>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${bmiCategory(bmi).color}`}>
                    {bmiCategory(bmi).label}
                  </div>
                  {/* Visual gauge */}
                  <div className="relative h-4 rounded-full overflow-hidden bg-muted">
                    <div className="absolute inset-y-0 left-0 w-[25%] bg-warning/40" />
                    <div className="absolute inset-y-0 left-[25%] w-[25%] bg-success/40" />
                    <div className="absolute inset-y-0 left-[50%] w-[25%] bg-warning/40" />
                    <div className="absolute inset-y-0 left-[75%] w-[25%] bg-destructive/40" />
                    <div className="absolute top-0 h-full w-1 bg-foreground rounded" style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 2), 98)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* BP Tracker */}
        <TabsContent value="bp">
          <Card>
            <CardHeader><CardTitle>Blood Pressure Tracker</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Systolic (mmHg)</Label>
                  <Input type="number" placeholder="120" value={systolic} onChange={(e) => setSystolic(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Diastolic (mmHg)</Label>
                  <Input type="number" placeholder="80" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} />
                </div>
              </div>
              {systolic && diastolic && (
                <div className="text-center">
                  <Badge variant={getBPStatus(parseInt(systolic), parseInt(diastolic)).color}>
                    {getBPStatus(parseInt(systolic), parseInt(diastolic)).label}
                  </Badge>
                </div>
              )}
              <Button onClick={addBPReading} className="w-full" size="lg">Record Reading</Button>

              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bpReadings}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis domain={[60, 200]} className="text-xs" />
                    <Tooltip />
                    <ReferenceLine y={120} stroke="hsl(var(--success))" strokeDasharray="3 3" label="Normal" />
                    <ReferenceLine y={140} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="High" />
                    <Line type="monotone" dataKey="systolic" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Routine Tracker */}
        <TabsContent value="routine">
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Footprints className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold">Steps</h4>
                      <span className="text-sm font-medium">{steps.toLocaleString()} / 10,000</span>
                    </div>
                    <Progress value={(steps / 10000) * 100} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-asha/10 flex items-center justify-center">
                    <Moon className="h-7 w-7 text-asha" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold">Sleep</h4>
                      <span className="text-sm font-medium">{sleep}h / 8h</span>
                    </div>
                    <Progress value={(sleep / 8) * 100} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-doctor/10 flex items-center justify-center">
                    <Droplets className="h-7 w-7 text-doctor" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold">Water</h4>
                      <span className="text-sm font-medium">{water} / 8 glasses</span>
                    </div>
                    <Progress value={(water / 8) * 100} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
