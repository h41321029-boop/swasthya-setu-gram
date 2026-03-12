import { useState } from "react";
import { Phone, AlertTriangle, Send, Bot, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function EmergencyPortal() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "🚨 Emergency Triage AI — I'm here to help. Please describe your emergency situation or symptoms. I'll assess the severity and connect you with the right help immediately.\n\nExamples:\n• Chest pain and difficulty breathing\n• Someone fainted and is not responding\n• High fever for 3 days in a child" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Mock AI response
    await new Promise((r) => setTimeout(r, 1500));
    const responses = [
      "Based on your description, I'm classifying this as **URGENT**. I'm adding your case to the nearest doctor's queue. A doctor will contact you within 15 minutes.\n\n📞 Meanwhile, here are immediate steps:\n1. Stay calm and sit upright\n2. Loosen any tight clothing\n3. Keep the patient hydrated\n\nYour case ID: #EMG-2024-0847",
      "This appears to be a **CRITICAL** situation. I'm immediately notifying:\n\n🏥 Nearest PHC: Wadgaon Primary Health Center (2.3 km)\n👩‍⚕️ ASHA Worker: Sunita Devi has been alerted\n🚑 Emergency services have been contacted\n\nStay on this line. Help is on the way.",
      "I understand your concern. Based on the symptoms, this seems **MILD**. Here are some self-care tips:\n\n💊 Take paracetamol for fever (if above 100°F)\n💧 Stay well hydrated with ORS solution\n🛏️ Get adequate rest\n\nIf symptoms worsen, don't hesitate to come back. I've also scheduled a routine consultation for you tomorrow at 10 AM.",
    ];

    setMessages((m) => [...m, { role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] }]);
    setLoading(false);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-sos">Emergency Portal</h1>
          <p className="text-sm text-muted-foreground">AI-powered emergency triage — No login required</p>
        </div>
        <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Active</Badge>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" className="h-auto flex-col gap-1 py-3 text-xs border-sos/20 text-sos hover:bg-sos/5">
          <Phone className="h-5 w-5" />
          Call 108
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-1 py-3 text-xs border-sos/20 text-sos hover:bg-sos/5">
          <AlertTriangle className="h-5 w-5" />
          Alert ASHA
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-1 py-3 text-xs border-sos/20 text-sos hover:bg-sos/5">
          <Bot className="h-5 w-5" />
          AI Triage
        </Button>
      </div>

      {/* Chat */}
      <Card className="min-h-[400px] flex flex-col">
        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[500px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted rounded-bl-md"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl rounded-bl-md text-sm">
                <span className="animate-pulse">Analyzing your situation...</span>
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Describe your emergency..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
