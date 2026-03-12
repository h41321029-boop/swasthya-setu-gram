

# Swasthya Setu Gram - Complete Rebuild Plan

The current codebase is essentially empty (only Supabase integration files remain). This plan covers rebuilding the entire application from scratch.

## Architecture Overview

```text
src/
├── main.tsx, App.tsx, index.css
├── i18n/translations.ts
├── data/                          # Mock data for all modules
│   ├── doctors.ts, medicines.ts
│   ├── healthRecords.ts, users.ts
│   └── recoveryResources.ts
├── hooks/                         # Shared hooks
│   └── use-toast.ts, use-mobile.ts
├── lib/utils.ts
├── components/
│   ├── ui/                        # Shadcn components
│   ├── layout/                    # AppShell, Sidebar, BottomNav
│   ├── auth/                      # LoginForm, SignupForm, OTPVerification
│   ├── emergency/                 # SOSButton, EmergencyChat
│   ├── medi-tools/                # BMICalculator, BPTracker, RoutineTracker
│   ├── telemedicine/              # DoctorCard, BookingFlow, ConsultationChat
│   ├── pharmacy/                  # MedicineCard, Cart, OrderTracking
│   ├── addiction/                 # CommunityFeed, VideoLibrary, ExpertChat
│   ├── womens-health/             # CycleCalendar, FertilityCalc, EducationHub
│   └── diet/                      # FoodLogger, CalorieChart, FastingPlanner
├── pages/
│   ├── Auth.tsx                   # Login/Signup with Aadhar + OTP
│   ├── RoleSelection.tsx
│   ├── patient/PatientDashboard.tsx
│   ├── doctor/DoctorDashboard.tsx  # Calendar availability UI
│   ├── asha/AshaDashboard.tsx      # Proximity alerts
│   ├── EmergencyPortal.tsx
│   ├── HealthTips.tsx
│   ├── MediTools.tsx
│   ├── Telemedicine.tsx
│   ├── PharmacyStore.tsx
│   ├── AddictionRecovery.tsx
│   ├── WomensHealth.tsx
│   └── DietTracker.tsx
└── supabase/functions/
    ├── emergency-triage/index.ts   (exists)
    └── health-tips/index.ts        (exists)
```

## Implementation Steps

### Step 1: Foundation (App shell, routing, styling)
- Create `main.tsx`, `App.tsx`, `index.css` with teal/green/soft-blue color scheme, DM Sans font
- Set up React Router with all routes
- Build responsive `AppShell` layout with sidebar (desktop) and bottom nav (mobile)
- Persistent SOS button component (fixed position, always visible)

### Step 2: Authentication & Onboarding
- **Login/Signup** page with 12-digit Aadhar number field (validated) + password
- **Email OTP verification** step UI (6-digit input using `input-otp`)
- Wire to Supabase Auth (`signUp`, `signInWithPassword`) with Aadhar stored in user metadata
- Emergency SOS button on auth screen linking to `/emergency`

### Step 3: Role Selection & Dashboards
- **RoleSelection** page with large icon cards for Patient, Doctor, ASHA Worker, Panchayat, Pharmacist
- Language switcher (8 languages)
- **PatientDashboard**: Grid of feature cards (Medi-Tools, Telemedicine, Pharmacy, Addiction Recovery, Women's Health, Diet Tracker, Health Tips, Emergency)
- **DoctorDashboard**: Interactive weekly calendar for marking availability, appointment queue list, telemedicine session cards
- **AshaDashboard**: Critical patient proximity alert banner, patient visit checklist, vital data entry form (BP, SpO2, diabetes readings)

### Step 4: Medi-Tools Module
- **BMI Calculator**: Height/weight inputs with visual gauge (underweight/normal/overweight/obese)
- **BP Tracker**: Input systolic/diastolic, color-coded status indicator (green/yellow/red), history chart using Recharts
- **AI Routine Tracker**: Step count, sleep hours, water intake with progress rings and daily summary

### Step 5: Telemedicine ("Uber for Doctors")
- Browse available doctors with cards (specialty, rating, availability status)
- Filter by specialty, availability
- Booking flow: select time slot → confirm → booking confirmation
- Placeholder Chat/Video Call UI buttons
- Mock data in `src/data/doctors.ts`

### Step 6: Pharmacy Delivery
- E-commerce grid of medicine cards with search/filter
- Category tabs (Pain Relief, Diabetes, First Aid, etc.)
- Cart sidebar with quantity controls
- Order summary and delivery address form
- Mock data in `src/data/medicines.ts`

### Step 7: Addiction Recovery Center
- **Community Forum**: Post feed with like/comment counts, "Share your story" compose box
- **Video Library**: Grid of recovery resource video thumbnails with categories
- **Expert Chat**: Button linking to a counseling chat interface
- Calming purple/blue color accent for this section

### Step 8: Women's Health Module
- **Menstrual Cycle Calendar**: Day-picker calendar with cycle day highlighting, period start/end marking
- **Fertility/Safe-Day Calculator**: Input cycle length → visual fertile window display
- **Education Hub**: Cards for PCOD awareness, breast cancer info, with "Consult Gynecologist" CTA
- Pink/rose color accent, privacy-first messaging

### Step 9: Diet & Nutrition Tracker
- **Food Logger**: Meal entry form (breakfast/lunch/dinner/snack), search food items
- **Calorie/Macro Chart**: Daily bar chart (Recharts) showing calories, protein, carbs, fat
- **Fasting Planner**: Select fasting protocol (16:8, 18:6, etc.), visual timer
- **Condition Management**: Tabs for Diabetes-friendly and Obesity plans

### Step 10: Mock Data & Service Layer
- Create typed mock data files under `src/data/` for doctors, medicines, users, appointments, health records, recovery resources
- Create service abstraction files (`src/services/`) with functions like `getDoctors()`, `bookAppointment()` that currently return mock data but are structured for easy Supabase swap

### Step 11: Emergency Portal & Health Tips Bot
- Restore the Emergency Portal page (AI triage chat via edge function)
- Restore the Health Tips bot page (preventive care chat via edge function)

## Database Considerations
- No database tables will be created in this initial build
- All data will use mock/local state
- Service layer will be structured so Supabase tables can be added incrementally when needed
- RLS policies will be added when tables are created

## Design System
- **Colors**: Teal primary (`hsl(174, 60%, 40%)`), green accents, soft blue secondary, white backgrounds
- **Typography**: DM Sans (body), Crimson Pro (headings)
- **Components**: Large touch targets (min 48px), generous spacing, clear hierarchy
- **Transitions**: Smooth page transitions, hover states on all interactive elements

