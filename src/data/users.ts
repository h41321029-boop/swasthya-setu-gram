export type UserRole = 'patient' | 'doctor' | 'asha' | 'panchayat' | 'pharmacist';

export interface AppUser {
  id: string;
  aadharNumber: string;
  name: string;
  email: string;
  role: UserRole;
  village: string;
  phone: string;
}

export interface CriticalPatient {
  id: string;
  name: string;
  condition: string;
  severity: 'critical' | 'serious' | 'moderate';
  village: string;
  lastVisit: string;
  vitals: { bp: string; spo2: number; sugar: number };
}

export const criticalPatients: CriticalPatient[] = [
  { id: '1', name: 'Ramabai Patil', condition: 'Diabetic Emergency', severity: 'critical', village: 'Wadgaon', lastVisit: '2 days ago', vitals: { bp: '180/110', spo2: 88, sugar: 450 } },
  { id: '2', name: 'Shankar Jadhav', condition: 'Post-Cardiac Event', severity: 'serious', village: 'Chinchpur', lastVisit: '1 week ago', vitals: { bp: '160/95', spo2: 92, sugar: 180 } },
  { id: '3', name: 'Lakshmi Devi', condition: 'Pregnancy Complication', severity: 'critical', village: 'Wadgaon', lastVisit: '3 days ago', vitals: { bp: '150/100', spo2: 94, sugar: 120 } },
];

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: 'video' | 'chat' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
}

export const mockAppointments: Appointment[] = [
  { id: '1', patientName: 'Sunita Devi', time: '10:00 AM', type: 'video', status: 'upcoming', reason: 'Follow-up checkup' },
  { id: '2', patientName: 'Ravi Kumar', time: '11:30 AM', type: 'chat', status: 'upcoming', reason: 'Diabetes consultation' },
  { id: '3', patientName: 'Kamla Bai', time: '2:00 PM', type: 'in-person', status: 'upcoming', reason: 'BP monitoring' },
  { id: '4', patientName: 'Mohan Lal', time: '9:00 AM', type: 'video', status: 'completed', reason: 'Skin rash' },
];
