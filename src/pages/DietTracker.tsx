import { useState } from "react";
import { Apple, Plus, Timer, ArrowLeft, Flame, Beef, Wheat, Droplet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { foodDatabase, fastingPlans } from "@/data/healthRecords";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { toast } from "sonner";

export default function DietTracker() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState<{ name: string; calories: number; protein: number; carbs: number; fat: number; meal: string }[]>([
    { name: "Roti (2)", calories: 240, protein: 6, carbs: 50, fat: 2, meal: "Breakfast" },
    { name: "Dal (1 bowl)", calories: 150, protein: 9, carbs: 20, fat: 3, meal: "Lunch" },
    { name: "Rice (1 cup)", calories: 200, protein: 4, carbs: 45, fat: 0.5, meal: "Lunch" },
  ]);
  const [selectedFasting, setSelectedFasting] = useState("16:8");
  const [fastingActive, setFastingActive] = useState(false);

  const totalCalories = meals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = meals.reduce((s, m) => s + m.fat, 0);

  const macroData = [
    { name: "Calories", value: totalCalories, max: 2000, color: "hsl(var(--primary))" },
    { name: "Protein", value: totalProtein, max: 60, color: "hsl(var(--doctor))" },
    { name: "Carbs", value: totalCarbs, max: 300, color: "hsl(var(--warning))" },
    { name: "Fat", value: totalFat, max: 65, color: "hsl(var(--asha))" },
  ];

  const filteredFoods = foodDatabase.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  const addFood = (food: typeof foodDatabase[0], meal: string) => {
    setMeals((m) => [...m, { name: food.name, calories: food.calories, protein: food.protein, carbs: food.carbs, fat: food.fat, meal }]);
    toast.success(`${food.name} added to ${meal}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Diet & Nutrition</h1>
          <p className="text-muted-foreground">Track meals and manage fasting</p>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Calories", value: totalCalories, max: 2000, icon: Flame, color: "text-primary" },
          { label: "Protein", value: `${totalProtein}g`, max: 60, icon: Beef, color: "text-doctor" },
          { label: "Carbs", value: `${totalCarbs}g`, max: 300, icon: Wheat, color: "text-warning" },
          { label: "Fat", value: `${totalFat}g`, max: 65, icon: Droplet, color: "text-asha" },
        ].map((s) => (
          <Card key={s.label} className="text-center p-3">
            <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
            <p className="text-lg font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="log" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="log"><Apple className="h-4 w-4 mr-1" /> Food Log</TabsTrigger>
          <TabsTrigger value="chart"><Flame className="h-4 w-4 mr-1" /> Chart</TabsTrigger>
          <TabsTrigger value="fasting"><Timer className="h-4 w-4 mr-1" /> Fasting</TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="space-y-4">
          {/* Food Search */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Input placeholder="Search foods to add..." value={search} onChange={(e) => setSearch(e.target.value)} />
              {search && (
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredFoods.map((food) => (
                    <div key={food.id} className="flex items-center justify-between p-2 rounded border hover:bg-accent/50 transition-colors">
                      <div>
                        <p className="text-sm font-medium">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.calories} cal • P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
                      </div>
                      <div className="flex gap-1">
                        {["Breakfast", "Lunch", "Dinner"].map((m) => (
                          <Button key={m} size="sm" variant="outline" className="text-xs h-7" onClick={() => { addFood(food, m); setSearch(""); }}>
                            {m[0]}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Logged Meals */}
          {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealType) => {
            const mealItems = meals.filter((m) => m.meal === mealType);
            if (mealItems.length === 0 && mealType === "Snack") return null;
            return (
              <Card key={mealType}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{mealType}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {mealItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm p-1">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.calories} cal</span>
                    </div>
                  ))}
                  {mealItems.length === 0 && (
                    <p className="text-xs text-muted-foreground">No items logged</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="chart">
          <Card>
            <CardHeader><CardTitle className="text-lg">Daily Macros</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={macroData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {macroData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fasting" className="space-y-4">
          <div className="grid gap-3">
            {fastingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedFasting === plan.id ? "border-primary ring-1 ring-primary" : ""}`}
                onClick={() => setSelectedFasting(plan.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {plan.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                  {selectedFasting === plan.id && <Badge>Selected</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="text-center p-6">
            <Timer className="h-16 w-16 mx-auto text-primary mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-2">
              {fastingActive ? "Fasting in Progress" : "Ready to Fast"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {fastingActive ? "16:00:00 remaining" : `${fastingPlans.find((p) => p.id === selectedFasting)?.name} selected`}
            </p>
            <Button size="lg" onClick={() => setFastingActive(!fastingActive)} variant={fastingActive ? "destructive" : "default"}>
              {fastingActive ? "End Fast" : "Start Fast"}
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
