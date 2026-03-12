import { useState } from "react";
import { Lightbulb, Send, Bot, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickTopics = [
  "How to prevent diabetes?",
  "Healthy diet for monsoon season",
  "Child vaccination schedule",
  "Managing high blood pressure",
  "Benefits of morning walk",
];

export default function HealthTips() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "🌿 Namaste! I'm your AI Health Assistant. Ask me about:\n\n• Preventive healthcare tips\n• Seasonal health advice\n• Diet and nutrition guidance\n• Common illness management\n• Vaccination schedules\n\nHow can I help you stay healthy today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const tips = [
      "Great question! Here are some tips:\n\n1. **Stay hydrated** — Drink 8-10 glasses of water daily\n2. **Exercise regularly** — At least 30 minutes of walking\n3. **Eat balanced meals** — Include dal, vegetables, and fruits\n4. **Get adequate sleep** — 7-8 hours per night\n5. **Regular check-ups** — Visit your doctor every 6 months\n\nWould you like more specific advice?",
      "Here's what you should know:\n\n🥗 **Diet**: Include whole grains, leafy greens, and protein\n🏃 **Exercise**: 150 minutes of moderate activity per week\n💊 **Medication**: Take prescribed medicines on time\n🩺 **Monitoring**: Check your vitals regularly using our Medi-Tools\n\nRemember: Prevention is better than cure! 🌟",
    ];

    setMessages((m) => [...m, { role: "assistant", content: tips[Math.floor(Math.random() * tips.length)] }]);
    setLoading(false);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold">Health Tips</h1>
          <p className="text-sm text-muted-foreground">AI-powered preventive health advice</p>
        </div>
      </div>

      {/* Quick Topics */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickTopics.map((topic) => (
          <Button key={topic} variant="outline" size="sm" className="whitespace-nowrap text-xs" onClick={() => handleSend(topic)}>
            {topic}
          </Button>
        ))}
      </div>

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
              <div className="bg-muted p-3 rounded-2xl rounded-bl-md text-sm animate-pulse">Thinking...</div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Ask a health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={() => handleSend()} disabled={loading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
