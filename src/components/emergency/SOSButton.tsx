import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function SOSButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="sos"
      size="xl"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-2xl h-16 w-16 p-0"
      onClick={() => navigate("/emergency")}
      aria-label="Emergency SOS"
    >
      <Phone className="h-7 w-7" />
    </Button>
  );
}
