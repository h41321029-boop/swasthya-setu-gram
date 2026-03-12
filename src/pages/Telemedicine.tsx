import { useState } from "react";
import { Star, Clock, Video, MessageSquare, Filter, ArrowLeft, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { doctors, specialties } from "@/data/doctors";
import { toast } from "sonner";

export default function Telemedicine() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [search, setSearch] = useState("");
  const [bookingDoctor, setBookingDoctor] = useState<string | null>(null);

  const filtered = doctors.filter((d) => {
    const matchSpec = selectedSpecialty === "All" || d.specialty === selectedSpecialty;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  const handleBook = (doctorName: string) => {
    setBookingDoctor(doctorName);
    setTimeout(() => {
      toast.success(`Appointment booked with ${doctorName}!`);
      setBookingDoctor(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Telemedicine</h1>
          <p className="text-muted-foreground">Book a doctor within 1-2 hours</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search doctors..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {specialties.map((s) => (
            <Button key={s} variant={selectedSpecialty === s ? "default" : "outline"} size="sm" onClick={() => setSelectedSpecialty(s)} className="whitespace-nowrap">
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-4">
        {filtered.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-doctor/10 text-doctor font-semibold">{doc.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.specialty} • {doc.experience} yrs exp</p>
                    </div>
                    <Badge variant={doc.available ? "success" : "secondary"}>
                      {doc.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm flex-wrap">
                    <span className="flex items-center gap-1"><Star className="h-4 w-4 text-warning fill-warning" /> {doc.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {doc.nextSlot}</span>
                    <span className="font-semibold text-primary">₹{doc.fee}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      className="gap-1"
                      disabled={!doc.available || bookingDoctor === doc.name}
                      onClick={() => handleBook(doc.name)}
                    >
                      {bookingDoctor === doc.name ? "Booking..." : "Book Now"}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1"><Video className="h-4 w-4" /> Video</Button>
                    <Button size="sm" variant="outline" className="gap-1"><MessageSquare className="h-4 w-4" /> Chat</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
