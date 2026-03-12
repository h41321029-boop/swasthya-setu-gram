import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import Auth from "@/pages/Auth";
import RoleSelection from "@/pages/RoleSelection";
import PatientDashboard from "@/pages/patient/PatientDashboard";
import DoctorDashboard from "@/pages/doctor/DoctorDashboard";
import AshaDashboard from "@/pages/asha/AshaDashboard";
import MediTools from "@/pages/MediTools";
import Telemedicine from "@/pages/Telemedicine";
import PharmacyStore from "@/pages/PharmacyStore";
import AddictionRecovery from "@/pages/AddictionRecovery";
import WomensHealth from "@/pages/WomensHealth";
import DietTracker from "@/pages/DietTracker";
import EmergencyPortal from "@/pages/EmergencyPortal";
import HealthTips from "@/pages/HealthTips";

function DashboardRouter() {
  const role = localStorage.getItem("userRole");
  if (role === "doctor") return <DoctorDashboard />;
  if (role === "asha") return <AshaDashboard />;
  return <PatientDashboard />;
}

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/role-select" element={<RoleSelection />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/medi-tools" element={<MediTools />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/pharmacy" element={<PharmacyStore />} />
          <Route path="/addiction-recovery" element={<AddictionRecovery />} />
          <Route path="/womens-health" element={<WomensHealth />} />
          <Route path="/diet-tracker" element={<DietTracker />} />
          <Route path="/emergency" element={<EmergencyPortal />} />
          <Route path="/health-tips" element={<HealthTips />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
