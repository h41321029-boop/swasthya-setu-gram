import { useNavigate } from "react-router-dom";
import { User, Stethoscope, HeartHandshake, Building2, Pill, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/components/layout/AppShell";
import { t, type Language, languageNames } from "@/i18n/translations";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const roles = [
  { id: "patient", icon: User, labelKey: "patient", colorClass: "bg-patient text-patient-foreground", desc: "Access health services" },
  { id: "doctor", icon: Stethoscope, labelKey: "doctor", colorClass: "bg-doctor text-doctor-foreground", desc: "Manage appointments" },
  { id: "asha", icon: HeartHandshake, labelKey: "ashaWorker", colorClass: "bg-asha text-asha-foreground", desc: "Community health" },
  { id: "panchayat", icon: Building2, labelKey: "panchayat", colorClass: "bg-panchayat text-panchayat-foreground", desc: "Village oversight" },
  { id: "pharmacist", icon: Pill, labelKey: "pharmacist", colorClass: "bg-pharmacist text-pharmacist-foreground", desc: "Medicine delivery" },
];

export default function RoleSelection() {
  const { language, setLanguage, setUserRole } = useAppContext();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);

  const selectRole = (role: string) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 relative">
        <Button variant="outline" size="sm" onClick={() => setLangOpen(!langOpen)} className="gap-2">
          <Globe className="h-4 w-4" />
          {languageNames[language]}
        </Button>
        {langOpen && (
          <div className="absolute top-full right-0 mt-1 w-40 bg-popover border rounded-lg shadow-lg p-1 z-50">
            {(Object.keys(languageNames) as Language[]).map((l) => (
              <button key={l} className="w-full text-left px-3 py-2 text-sm rounded hover:bg-accent" onClick={() => { setLanguage(l); setLangOpen(false); }}>
                {languageNames[l]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold">{t("selectRole", language)}</h1>
          <p className="text-muted-foreground">Choose your role to continue</p>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => selectRole(role.id)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex items-center justify-center h-14 w-14 rounded-xl ${role.colorClass}`}>
                  <role.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t(role.labelKey, language)}</h3>
                  <p className="text-sm text-muted-foreground">{role.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
