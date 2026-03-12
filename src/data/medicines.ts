export interface Medicine {
  id: string;
  name: string;
  generic: string;
  category: string;
  price: number;
  unit: string;
  inStock: boolean;
  prescription: boolean;
  description: string;
}

export const medicines: Medicine[] = [
  { id: '1', name: 'Paracetamol 500mg', generic: 'Acetaminophen', category: 'Pain Relief', price: 25, unit: 'Strip of 10', inStock: true, prescription: false, description: 'For fever and mild pain relief' },
  { id: '2', name: 'Amoxicillin 250mg', generic: 'Amoxicillin', category: 'Antibiotics', price: 85, unit: 'Strip of 10', inStock: true, prescription: true, description: 'Broad-spectrum antibiotic' },
  { id: '3', name: 'Metformin 500mg', generic: 'Metformin HCl', category: 'Diabetes', price: 45, unit: 'Strip of 10', inStock: true, prescription: true, description: 'For type 2 diabetes management' },
  { id: '4', name: 'Amlodipine 5mg', generic: 'Amlodipine', category: 'Blood Pressure', price: 55, unit: 'Strip of 10', inStock: true, prescription: true, description: 'Calcium channel blocker for BP' },
  { id: '5', name: 'ORS Sachets', generic: 'Electrolyte Mix', category: 'First Aid', price: 15, unit: 'Pack of 5', inStock: true, prescription: false, description: 'Oral rehydration salts' },
  { id: '6', name: 'Cetirizine 10mg', generic: 'Cetirizine', category: 'Allergy', price: 30, unit: 'Strip of 10', inStock: true, prescription: false, description: 'Antihistamine for allergies' },
  { id: '7', name: 'Omeprazole 20mg', generic: 'Omeprazole', category: 'Gastric', price: 65, unit: 'Strip of 10', inStock: false, prescription: true, description: 'For acid reflux and ulcers' },
  { id: '8', name: 'Bandage Roll', generic: 'Cotton Bandage', category: 'First Aid', price: 40, unit: '1 Roll', inStock: true, prescription: false, description: 'Sterile cotton bandage roll' },
  { id: '9', name: 'Ibuprofen 400mg', generic: 'Ibuprofen', category: 'Pain Relief', price: 35, unit: 'Strip of 10', inStock: true, prescription: false, description: 'Anti-inflammatory pain reliever' },
  { id: '10', name: 'Insulin Glargine', generic: 'Insulin', category: 'Diabetes', price: 450, unit: '1 Pen', inStock: true, prescription: true, description: 'Long-acting insulin' },
];

export const medicineCategories = ['All', 'Pain Relief', 'Antibiotics', 'Diabetes', 'Blood Pressure', 'First Aid', 'Allergy', 'Gastric'];
