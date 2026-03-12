export interface ForumPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  anonymous: boolean;
}

export interface RecoveryVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
}

export const forumPosts: ForumPost[] = [
  { id: '1', author: 'Anonymous', content: 'Day 45 without alcohol. The mornings are so much clearer now. Thank you to everyone who supported me here.', timestamp: '2 hours ago', likes: 24, comments: 8, anonymous: true },
  { id: '2', author: 'Rahul M.', content: 'Started meditation last week as part of my recovery journey. It really helps with cravings. Has anyone else tried mindfulness techniques?', timestamp: '5 hours ago', likes: 18, comments: 12, anonymous: false },
  { id: '3', author: 'Anonymous', content: 'Reducing my screen time has been the hardest challenge. Any tips for managing phone addiction?', timestamp: '1 day ago', likes: 31, comments: 15, anonymous: true },
  { id: '4', author: 'Priya S.', content: 'One year sober today! Never thought I could do it. If I can, you can too. Stay strong everyone 💪', timestamp: '1 day ago', likes: 89, comments: 34, anonymous: false },
];

export const recoveryVideos: RecoveryVideo[] = [
  { id: '1', title: 'Understanding Addiction: The Science Behind It', category: 'Education', duration: '12:30', thumbnail: '🧠', description: 'Learn how addiction affects the brain and why recovery is possible.' },
  { id: '2', title: 'Daily Meditation for Recovery', category: 'Meditation', duration: '20:00', thumbnail: '🧘', description: 'A guided meditation session designed for people in recovery.' },
  { id: '3', title: 'Building Healthy Habits', category: 'Lifestyle', duration: '15:45', thumbnail: '🌱', description: 'Replace harmful habits with positive ones step by step.' },
  { id: '4', title: 'Family Support in Recovery', category: 'Support', duration: '18:20', thumbnail: '👨‍👩‍👧', description: 'How families can support their loved ones through recovery.' },
  { id: '5', title: 'Yoga for Stress Relief', category: 'Exercise', duration: '25:00', thumbnail: '🧘‍♂️', description: 'Gentle yoga sequences to manage stress and anxiety.' },
  { id: '6', title: 'Nutrition During Recovery', category: 'Health', duration: '14:10', thumbnail: '🥗', description: 'Foods that help your body heal during the recovery process.' },
];

export const videoCategories = ['All', 'Education', 'Meditation', 'Lifestyle', 'Support', 'Exercise', 'Health'];
