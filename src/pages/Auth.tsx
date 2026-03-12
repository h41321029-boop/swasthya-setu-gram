import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/components/layout/AppShell";
import { t } from "@/i18n/translations";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type AuthStep = "login" | "signup" | "otp";

export default function Auth() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const formatAadhar = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, "");
    if (/^\d*$/.test(raw) && raw.length <= 12) {
      setAadhar(raw);
    }
  };

  const handleLogin = async () => {
    if (aadhar.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhar number");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Login successful!");
    navigate("/role-select");
  };

  const handleSignup = async () => {
    if (aadhar.length !== 12) { toast.error("Enter valid 12-digit Aadhar"); return; }
    if (!email.includes("@")) { toast.error("Enter valid email"); return; }
    if (password.length < 6) { toast.error("Password min 6 chars"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("otp");
    toast.info("OTP sent to your email!");
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) { toast.error("Enter 6-digit OTP"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Account verified!");
    navigate("/role-select");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* App Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">{t("appName", language)}</h1>
          <p className="text-muted-foreground text-sm">Rural Healthcare Super App</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">
              {step === "otp" ? t("verifyOTP", language) : step === "login" ? t("login", language) : t("signup", language)}
            </CardTitle>
            <CardDescription>
              {step === "otp"
                ? "Enter the 6-digit code sent to your email"
                : "Use your Aadhar number to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === "otp" ? (
              <>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button className="w-full" size="lg" onClick={handleVerifyOTP} disabled={loading}>
                  {loading ? "Verifying..." : t("verifyOTP", language)}
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setStep("signup")}>
                  Back to Sign Up
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="aadhar">{t("aadharNumber", language)}</Label>
                  <div className="relative">
                    <Input
                      id="aadhar"
                      placeholder="XXXX XXXX XXXX"
                      value={formatAadhar(aadhar)}
                      onChange={handleAadharChange}
                      className="pl-10 h-12 text-lg tracking-wider"
                      maxLength={14}
                    />
                    <Shield className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {aadhar.length}/12 digits
                  </p>
                </div>

                {step === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email", language)}</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                      />
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">{t("password", language)}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                    />
                    <Shield className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <button
                      type="button"
                      className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={step === "login" ? handleLogin : handleSignup}
                  disabled={loading}
                >
                  {loading ? "Please wait..." : step === "login" ? t("login", language) : t("signup", language)}
                </Button>

                <div className="text-center">
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => setStep(step === "login" ? "signup" : "login")}
                  >
                    {step === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                  </button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Emergency Access */}
        <div className="text-center">
          <Button variant="outline" className="border-sos text-sos hover:bg-sos hover:text-sos-foreground" size="lg" onClick={() => navigate("/emergency")}>
            <Phone className="h-5 w-5 mr-2" />
            {t("emergency", language)} — No Login Required
          </Button>
        </div>
      </div>
    </div>
  );
}
