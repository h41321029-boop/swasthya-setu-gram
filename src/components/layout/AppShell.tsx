import { useState, createContext, useContext, type ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Home, Stethoscope, Pill, HeartPulse, Apple, ShieldAlert, Flower2,
  Calendar, Menu, X, LogOut, Globe, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOSButton } from "@/components/emergency/SOSButton";
import { type Language, languageNames, t } from "@/i18n/translations";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  userRole: string | null;
  setUserRole: (r: string | null) => void;
}

const AppContext = createContext<AppContextType>({
  language: "en", setLanguage: () => {}, userRole: null, setUserRole: () => {},
});

export const useAppContext = () => useContext(AppContext);

const navItems = [
  { path: "/dashboard", icon: Home, labelKey: "home" },
  { path: "/medi-tools", icon: HeartPulse, labelKey: "mediTools" },
  { path: "/telemedicine", icon: Stethoscope, labelKey: "telemedicine" },
  { path: "/pharmacy", icon: Pill, labelKey: "pharmacy" },
  { path: "/addiction-recovery", icon: ShieldAlert, labelKey: "addictionRecovery" },
  { path: "/womens-health", icon: Flower2, labelKey: "womensHealth" },
  { path: "/diet-tracker", icon: Apple, labelKey: "dietTracker" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === "/" || location.pathname === "/auth" || location.pathname === "/role-select";
  if (isAuthPage) {
    return (
      <AppContext.Provider value={{ language, setLanguage, userRole, setUserRole }}>
        {children}
        <SOSButton />
      </AppContext.Provider>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    navigate("/");
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, userRole, setUserRole }}>
      <div className="min-h-screen flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
            <div className="p-5 border-b border-sidebar-border">
              <h1 className="text-xl font-serif font-bold text-sidebar-primary">
                {t("appName", language)}
              </h1>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {t(item.labelKey, language)}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-sidebar-border space-y-2">
              <div className="relative">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => setLangOpen(!langOpen)}>
                  <Globe className="h-4 w-4" />
                  {languageNames[language]}
                </Button>
                {langOpen && (
                  <div className="absolute bottom-full left-0 mb-1 w-full bg-popover border rounded-lg shadow-lg p-1 z-50">
                    {(Object.keys(languageNames) as Language[]).map((l) => (
                      <button key={l} className="w-full text-left px-3 py-2 text-sm rounded hover:bg-accent transition-colors" onClick={() => { setLanguage(l); setLangOpen(false); }}>
                        {languageNames[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                {t("logout", language)}
              </Button>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Header */}
          {isMobile && (
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-serif font-bold text-primary">
                {t("appName", language)}
              </h1>
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <User className="h-5 w-5" />
              </Button>
            </header>
          )}

          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
            {children}
          </main>

          {/* Mobile Bottom Nav */}
          {isMobile && (
            <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t flex justify-around py-2 px-1">
              {navItems.slice(0, 5).map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs transition-colors ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate max-w-[60px]">{t(item.labelKey, language)}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-foreground/20" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-72 bg-background border-r flex flex-col h-full">
              <div className="p-4 flex items-center justify-between border-b">
                <h2 className="font-serif font-bold text-primary">{t("appName", language)}</h2>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    {t(item.labelKey, language)}
                  </Link>
                ))}
              </nav>
              <div className="p-3 border-t space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => setLangOpen(!langOpen)}>
                  <Globe className="h-4 w-4" /> {languageNames[language]}
                </Button>
                {langOpen && (
                  <div className="grid grid-cols-2 gap-1 p-2 bg-muted rounded-lg">
                    {(Object.keys(languageNames) as Language[]).map((l) => (
                      <button key={l} className="text-left px-2 py-1.5 text-sm rounded hover:bg-accent" onClick={() => { setLanguage(l); setLangOpen(false); }}>
                        {languageNames[l]}
                      </button>
                    ))}
                  </div>
                )}
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> {t("logout", language)}
                </Button>
              </div>
            </div>
          </div>
        )}

        <SOSButton />
      </div>
    </AppContext.Provider>
  );
}
