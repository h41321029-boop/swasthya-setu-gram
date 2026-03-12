export interface BPReading {
  date: string;
  systolic: number;
  diastolic: number;
  status: 'normal' | 'elevated' | 'high' | 'crisis';
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

export const sampleBPReadings: BPReading[] = [
  { date: 'Mar 1', systolic: 120, diastolic: 80, status: 'normal' },
  { date: 'Mar 3', systolic: 128, diastolic: 84, status: 'elevated' },
  { date: 'Mar 5', systolic: 135, diastolic: 88, status: 'high' },
  { date: 'Mar 7', systolic: 122, diastolic: 78, status: 'normal' },
  { date: 'Mar 9', systolic: 140, diastolic: 92, status: 'high' },
  { date: 'Mar 11', systolic: 118, diastolic: 76, status: 'normal' },
  { date: 'Mar 12', systolic: 125, diastolic: 82, status: 'elevated' },
];

export const foodDatabase: FoodItem[] = [
  { id: '1', name: 'Roti (1 piece)', calories: 120, protein: 3, carbs: 25, fat: 1, category: 'Grains' },
  { id: '2', name: 'Rice (1 cup)', calories: 200, protein: 4, carbs: 45, fat: 0.5, category: 'Grains' },
  { id: '3', name: 'Dal (1 bowl)', calories: 150, protein: 9, carbs: 20, fat: 3, category: 'Pulses' },
  { id: '4', name: 'Sabzi (1 bowl)', calories: 80, protein: 3, carbs: 10, fat: 4, category: 'Vegetables' },
  { id: '5', name: 'Curd (1 cup)', calories: 100, protein: 8, carbs: 5, fat: 5, category: 'Dairy' },
  { id: '6', name: 'Milk (1 glass)', calories: 150, protein: 8, carbs: 12, fat: 8, category: 'Dairy' },
  { id: '7', name: 'Egg (1 boiled)', calories: 78, protein: 6, carbs: 1, fat: 5, category: 'Protein' },
  { id: '8', name: 'Banana (1)', calories: 105, protein: 1, carbs: 27, fat: 0, category: 'Fruits' },
  { id: '9', name: 'Apple (1)', calories: 95, protein: 0.5, carbs: 25, fat: 0, category: 'Fruits' },
  { id: '10', name: 'Paneer (100g)', calories: 265, protein: 18, carbs: 4, fat: 20, category: 'Dairy' },
  { id: '11', name: 'Chicken Curry (1 bowl)', calories: 250, protein: 25, carbs: 8, fat: 14, category: 'Protein' },
  { id: '12', name: 'Paratha (1)', calories: 200, protein: 4, carbs: 30, fat: 7, category: 'Grains' },
];

export const fastingPlans = [
  { id: '16:8', name: '16:8 Plan', fastHours: 16, eatHours: 8, description: 'Fast for 16 hours, eat within 8-hour window. Best for beginners.' },
  { id: '18:6', name: '18:6 Plan', fastHours: 18, eatHours: 6, description: 'Fast for 18 hours, eat within 6-hour window. Intermediate level.' },
  { id: '20:4', name: '20:4 Plan', fastHours: 20, eatHours: 4, description: 'Fast for 20 hours, eat within 4-hour window. Advanced level.' },
  { id: '5:2', name: '5:2 Plan', fastHours: 0, eatHours: 0, description: 'Eat normally 5 days, restrict calories 2 days per week.' },
];
