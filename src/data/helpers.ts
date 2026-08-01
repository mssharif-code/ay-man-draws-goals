export type Availability = { day: string; hours: string };
export type Review = { author: string; rating: number; text: string };

export type Helper = {
  id: string;
  name: string;
  role: string;
  image: string;
  city: string;
  state: string;
  nativeLanguage: string;
  languages: string[];
  bio: string;
  experienceYears: number;
  rateMin: number;
  rateMax: number;
  services: string[];
  responsibilities: string[];
  skills: string[];
  availability: Availability[];
  reviews: Review[];
};

export const helpers: Helper[] = [
  {
    id: "amara",
    name: "Amara Singh",
    role: "Home Cook",
    image:
      "https://images.pexels.com/photos/4194619/pexels-photo-4194619.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Marathi",
    languages: ["Marathi", "Hindi", "English"],
    bio: "Amara cooks warm, home-style North and South Indian meals for families in Bandra, with a light touch on oil and spice.",
    experienceYears: 8,
    rateMin: 220,
    rateMax: 320,
    services: [
      "Daily breakfast, lunch and dinner",
      "Festival and party cooking",
      "Grocery shopping",
      "Diet-specific meal plans",
    ],
    responsibilities: [
      "Plan and cook daily meals for the household",
      "Shop for fresh groceries and pantry staples",
      "Keep the kitchen clean and organised",
      "Accommodate dietary preferences and allergies",
    ],
    skills: ["North Indian", "South Indian", "Jain food", "Meal prep", "Hygiene"],
    availability: [
      { day: "Mon–Fri", hours: "7:00 AM – 11:00 AM, 6:00 PM – 9:00 PM" },
      { day: "Saturday", hours: "8:00 AM – 12:00 PM" },
      { day: "Sunday", hours: "Off" },
    ],
    reviews: [
      { author: "Neha K.", rating: 5, text: "Her dal and rotis taste just like home. Very punctual." },
      { author: "Rajesh M.", rating: 5, text: "Handled a 20-guest dinner on her own. Brilliant." },
    ],
  },
  {
    id: "rohan",
    name: "Rohan Patel",
    role: "Elder Care Assistant",
    image:
      "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Gujarati",
    languages: ["Gujarati", "Hindi", "English"],
    bio: "Rohan supports senior citizens in Powai with daily routines, medication reminders and gentle companionship.",
    experienceYears: 6,
    rateMin: 280,
    rateMax: 400,
    services: [
      "Daytime elder companionship",
      "Medication and appointment reminders",
      "Mobility and physiotherapy support",
      "Hospital visit accompaniment",
    ],
    responsibilities: [
      "Provide companionship and conversation",
      "Assist with medication reminders",
      "Help with light mobility and exercise",
      "Prepare simple meals and snacks",
    ],
    skills: ["First aid", "Patience", "Physio basics", "Record keeping"],
    availability: [
      { day: "Mon–Fri", hours: "9:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
      { day: "Sunday", hours: "On request" },
    ],
    reviews: [
      { author: "Anita D.", rating: 5, text: "My father looks forward to his visits every morning." },
      { author: "Sameer J.", rating: 4, text: "Calm, reliable and great with medication schedules." },
    ],
  },
  {
    id: "meera",
    name: "Meera Nair",
    role: "House Cleaner",
    image:
      "https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Malayalam",
    languages: ["Malayalam", "Hindi", "English"],
    bio: "Meera handles deep cleaning and everyday upkeep for apartments in Andheri, with eco-friendly products on request.",
    experienceYears: 9,
    rateMin: 180,
    rateMax: 260,
    services: [
      "Daily sweeping and mopping",
      "Deep cleaning and de-cluttering",
      "Bathroom and kitchen sanitisation",
      "Laundry and ironing",
    ],
    responsibilities: [
      "Sweep, mop, and dust all living areas",
      "Clean bathrooms and kitchen surfaces",
      "Laundry folding and bed-making",
      "Eco-friendly product options on request",
    ],
    skills: ["Deep cleaning", "Eco products", "Organising", "Time management"],
    availability: [
      { day: "Mon–Fri", hours: "8:00 AM – 1:00 PM" },
      { day: "Saturday", hours: "8:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Off" },
    ],
    reviews: [
      { author: "Farah S.", rating: 5, text: "Our flat has never looked this clean. Thorough and quick." },
      { author: "Vinod P.", rating: 5, text: "Very trustworthy, has house keys for two years now." },
    ],
  },
  {
    id: "vikram",
    name: "Vikram Rao",
    role: "Child Care Assistant",
    image:
      "https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Kannada",
    languages: ["Kannada", "Hindi", "English"],
    bio: "Vikram looks after school-going children in Juhu — homework, play time and safe pickups from school.",
    experienceYears: 5,
    rateMin: 250,
    rateMax: 350,
    services: [
      "After-school child supervision",
      "Homework and reading help",
      "School pickup and drop",
      "Snack preparation",
    ],
    responsibilities: [
      "Supervise and play with children",
      "Help with homework and reading",
      "Prepare snacks and light meals",
      "Follow parents' routines and rules",
    ],
    skills: ["Child safety", "Tutoring", "Creative play", "CPR trained"],
    availability: [
      { day: "Mon–Fri", hours: "1:00 PM – 8:00 PM" },
      { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Off" },
    ],
    reviews: [
      { author: "Divya R.", rating: 5, text: "Kids adore him and his homework routine actually works." },
      { author: "Karan T.", rating: 4, text: "Always on time for the school pickup." },
    ],
  },
];

export function getHelperById(id: string): Helper | undefined {
  return helpers.find((h) => h.id === id);
}
