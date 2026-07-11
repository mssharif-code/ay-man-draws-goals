import helperCleaner from "@/assets/helper-cleaner.jpg";
import helperCook from "@/assets/helper-cook.jpg";
import helperNanny from "@/assets/helper-nanny.jpg";
import helperGardener from "@/assets/helper-gardener.jpg";
import helperHandyman from "@/assets/helper-handyman.jpg";
import helperLaundry from "@/assets/helper-laundry.jpg";
import helperPetcare from "@/assets/helper-petcare.jpg";
import helperEldercare from "@/assets/helper-eldercare.jpg";

export type Helper = {
  id: string;
  name: string;
  role: string;
  image: string;
  rateMin: number;
  rateMax: number;
  responsibilities: string[];
  skills: string[];
  bio: string;
  experienceYears: number;
  languages: string[];
  services: string[];
  availability: { day: string; hours: string }[];
};

export const helpers: Helper[] = [
  {
    id: "h1",
    name: "Maria",
    role: "House Cleaner",
    image: helperCleaner,
    rateMin: 22,
    rateMax: 28,
    responsibilities: [
      "Dusting, vacuuming, and mopping all rooms",
      "Kitchen and bathroom deep cleaning",
      "Laundry folding and bed making",
      "Organizing clutter and taking out trash",
    ],
    skills: [
      "Attention to detail",
      "Knowledge of safe cleaning products",
      "Time management",
      "Trustworthy with keys",
    ],
    bio: "Maria has built a loyal client base over the past decade by treating every home like her own. She specializes in eco-friendly deep cleans and post-renovation tidy-ups.",
    experienceYears: 10,
    languages: ["English", "Spanish"],
    services: [
      "Weekly recurring cleaning",
      "Move-in / move-out deep clean",
      "Post-party & event cleanup",
      "Seasonal deep cleaning",
    ],
    availability: [
      { day: "Mon – Fri", hours: "8:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
      { day: "Sunday", hours: "Unavailable" },
    ],
  },
  {
    id: "h2",
    name: "Priya",
    role: "Home Cook",
    image: helperCook,
    rateMin: 25,
    rateMax: 35,
    responsibilities: [
      "Meal planning and grocery lists",
      "Cooking fresh daily meals",
      "Kitchen cleanup after cooking",
      "Accommodating dietary restrictions",
    ],
    skills: [
      "Food safety and hygiene",
      "Menu variety",
      "Budget-friendly shopping",
      "Punctual meal delivery",
    ],
    bio: "Trained in both Indian and Mediterranean cuisines, Priya crafts weekly menus around your family's tastes, allergies, and health goals.",
    experienceYears: 8,
    languages: ["English", "Hindi", "Punjabi"],
    services: [
      "Weekly meal prep (5–7 days)",
      "Dinner party cooking",
      "Special diets (vegan, gluten-free, keto)",
      "Grocery shopping & pantry stocking",
    ],
    availability: [
      { day: "Mon – Thu", hours: "10:00 AM – 7:00 PM" },
      { day: "Fri – Sat", hours: "12:00 PM – 9:00 PM" },
      { day: "Sunday", hours: "By request" },
    ],
  },
  {
    id: "h3",
    name: "Emma",
    role: "Nanny",
    image: helperNanny,
    rateMin: 20,
    rateMax: 30,
    responsibilities: [
      "Child supervision and playtime",
      "Homework help and reading",
      "Meal prep for kids",
      "Light child-related tidying",
    ],
    skills: [
      "First aid / CPR certified",
      "Patient and nurturing",
      "Creative activities",
      "Reliable communication",
    ],
    bio: "Emma holds an early-childhood education certificate and has cared for children aged 6 months to 12 years. She plans age-appropriate crafts, outings, and quiet reading time.",
    experienceYears: 6,
    languages: ["English", "French"],
    services: [
      "Full-time & part-time nannying",
      "After-school pickup & homework",
      "Date-night babysitting",
      "Newborn care support",
    ],
    availability: [
      { day: "Mon – Fri", hours: "7:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "Evenings only" },
      { day: "Sunday", hours: "Unavailable" },
    ],
  },
  {
    id: "h4",
    name: "David",
    role: "Gardener",
    image: helperGardener,
    rateMin: 23,
    rateMax: 32,
    responsibilities: [
      "Lawn mowing and hedge trimming",
      "Planting, weeding, and fertilizing",
      "Seasonal yard cleanup",
      "Watering schedules and pest checks",
    ],
    skills: [
      "Plant and soil knowledge",
      "Tool safety",
      "Physical stamina",
      "Eco-friendly practices",
    ],
    bio: "David is a horticulturist who designs low-maintenance, pollinator-friendly gardens. He brings his own tools and handles composting on-site.",
    experienceYears: 12,
    languages: ["English"],
    services: [
      "Bi-weekly lawn care",
      "Garden design & planting",
      "Hedge & tree trimming",
      "Fall & spring cleanup",
    ],
    availability: [
      { day: "Tue – Sat", hours: "7:00 AM – 3:00 PM" },
      { day: "Sun – Mon", hours: "Unavailable" },
    ],
  },
  {
    id: "h5",
    name: "Luis",
    role: "Handyman",
    image: helperHandyman,
    rateMin: 30,
    rateMax: 45,
    responsibilities: [
      "Minor plumbing and electrical fixes",
      "Furniture assembly and wall mounting",
      "Door, lock, and window repairs",
      "Preventive home maintenance checks",
    ],
    skills: [
      "General repair expertise",
      "Tool proficiency",
      "Problem-solving",
      "Reliable and punctual",
    ],
    bio: "Luis is a licensed handyman with a background in residential construction. He tackles anything from a leaky faucet to a full gallery wall install.",
    experienceYears: 15,
    languages: ["English", "Spanish"],
    services: [
      "Small plumbing & electrical",
      "Furniture assembly & mounting",
      "Drywall patching & painting",
      "Quarterly home maintenance",
    ],
    availability: [
      { day: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
      { day: "Sunday", hours: "Emergencies only" },
    ],
  },
  {
    id: "h6",
    name: "Aisha",
    role: "Laundry & Ironing",
    image: helperLaundry,
    rateMin: 18,
    rateMax: 26,
    responsibilities: [
      "Washing, drying, and folding clothes",
      "Ironing shirts, linens, and delicate fabrics",
      "Sorting laundry by color and fabric type",
      "Maintaining washer and dryer cleanliness",
    ],
    skills: [
      "Fabric care knowledge",
      "Stain treatment techniques",
      "Organization and efficiency",
      "Gentle handling of garments",
    ],
    bio: "Aisha treats every garment with care, from delicate silks to work shirts. She uses hypoallergenic detergents on request and folds like a boutique.",
    experienceYears: 5,
    languages: ["English", "Arabic"],
    services: [
      "Wash, dry & fold service",
      "Ironing & steaming",
      "Delicate & hand-wash items",
      "Wardrobe organization",
    ],
    availability: [
      { day: "Mon – Wed – Fri", hours: "9:00 AM – 4:00 PM" },
      { day: "Weekends", hours: "By appointment" },
    ],
  },
  {
    id: "h7",
    name: "Ryan",
    role: "Pet Care Helper",
    image: helperPetcare,
    rateMin: 20,
    rateMax: 28,
    responsibilities: [
      "Dog walking and outdoor playtime",
      "Feeding pets on schedule",
      "Litter box and pet area cleaning",
      "Administering basic medications if needed",
    ],
    skills: [
      "Animal handling experience",
      "Recognizing pet behavior cues",
      "First aid for pets",
      "Trustworthy with home access",
    ],
    bio: "Ryan grew up on a farm and has cared for dogs, cats, rabbits, and reptiles. He sends photo updates during every visit and follows your pet's exact routine.",
    experienceYears: 7,
    languages: ["English"],
    services: [
      "Daily dog walking",
      "Drop-in pet visits",
      "Overnight pet sitting",
      "Vet appointment transport",
    ],
    availability: [
      { day: "Every day", hours: "6:00 AM – 9:00 PM" },
      { day: "Overnight stays", hours: "By request" },
    ],
  },
  {
    id: "h8",
    name: "Sofia",
    role: "Elder Care Companion",
    image: helperEldercare,
    rateMin: 24,
    rateMax: 34,
    responsibilities: [
      "Companionship and conversation",
      "Medication reminders",
      "Light assistance with mobility",
      "Meal preparation and errands",
    ],
    skills: [
      "Patient and empathetic nature",
      "CPR and first aid certified",
      "Clear communication with families",
      "Experience with senior care",
    ],
    bio: "Sofia is a certified caregiver who has supported seniors with dementia, post-surgery recovery, and everyday companionship. Families love her calm, warm presence.",
    experienceYears: 9,
    languages: ["English", "Portuguese", "Spanish"],
    services: [
      "Daytime companion visits",
      "Medication & appointment reminders",
      "Meal prep & light housekeeping",
      "Errands & grocery runs",
    ],
    availability: [
      { day: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Unavailable" },
    ],
  },
];

export function getHelperById(id: string): Helper | undefined {
  return helpers.find((h) => h.id === id);
}
