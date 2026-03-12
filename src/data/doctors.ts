export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  available: boolean;
  nextSlot: string;
  fee: number;
  avatar: string;
  languages: string[];
}

export const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Priya Sharma', specialty: 'General Physician', rating: 4.8, experience: 12, available: true, nextSlot: '10:00 AM', fee: 200, avatar: 'PS', languages: ['Hindi', 'English'] },
  { id: '2', name: 'Dr. Rajesh Patel', specialty: 'Cardiologist', rating: 4.9, experience: 18, available: true, nextSlot: '11:30 AM', fee: 500, avatar: 'RP', languages: ['Hindi', 'Gujarati', 'English'] },
  { id: '3', name: 'Dr. Ananya Reddy', specialty: 'Gynecologist', rating: 4.7, experience: 10, available: false, nextSlot: 'Tomorrow 9:00 AM', fee: 400, avatar: 'AR', languages: ['Telugu', 'Hindi', 'English'] },
  { id: '4', name: 'Dr. Suresh Kumar', specialty: 'Pediatrician', rating: 4.6, experience: 15, available: true, nextSlot: '2:00 PM', fee: 300, avatar: 'SK', languages: ['Hindi', 'English'] },
  { id: '5', name: 'Dr. Meera Nair', specialty: 'Dermatologist', rating: 4.5, experience: 8, available: true, nextSlot: '3:30 PM', fee: 350, avatar: 'MN', languages: ['Malayalam', 'English'] },
  { id: '6', name: 'Dr. Amit Joshi', specialty: 'Orthopedic', rating: 4.8, experience: 20, available: false, nextSlot: 'Tomorrow 10:00 AM', fee: 600, avatar: 'AJ', languages: ['Marathi', 'Hindi', 'English'] },
  { id: '7', name: 'Dr. Kavitha Iyer', specialty: 'Psychiatrist', rating: 4.9, experience: 14, available: true, nextSlot: '4:00 PM', fee: 450, avatar: 'KI', languages: ['Tamil', 'English'] },
  { id: '8', name: 'Dr. Ramesh Gupta', specialty: 'Diabetologist', rating: 4.7, experience: 16, available: true, nextSlot: '5:00 PM', fee: 400, avatar: 'RG', languages: ['Hindi', 'Bengali', 'English'] },
];

export const specialties = ['All', 'General Physician', 'Cardiologist', 'Gynecologist', 'Pediatrician', 'Dermatologist', 'Orthopedic', 'Psychiatrist', 'Diabetologist'];
