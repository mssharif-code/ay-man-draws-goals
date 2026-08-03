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
    name: "Mirali Vandekar",
    role: "Home Cook",
    image:
      "https://images.pexels.com/photos/4194619/pexels-photo-4194619.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Marathi",
    languages: ["Marathi", "Hindi", "English"],
    bio: "Mirali cooks warm, home-style North and South Indian meals for families in Bandra, with a light touch on oil and spice.",
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
    name: "Tarvind Ghelot",
    role: "Elder Care Assistant",
    image:
      "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Gujarati",
    languages: ["Gujarati", "Hindi", "English"],
    bio: "Tarvind supports senior citizens in Powai with daily routines, medication reminders and gentle companionship.",
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
    name: "Ninika Poduval",
    role: "House Cleaner",
    image:
      "https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Malayalam",
    languages: ["Malayalam", "Hindi", "English"],
    bio: "Ninika handles deep cleaning and everyday upkeep for apartments in Andheri, with eco-friendly products on request.",
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
    name: "Devraj Kambhoj",
    role: "Child Care Assistant",
    image:
      "https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=600",
    city: "Mumbai",
    state: "Maharashtra",
    nativeLanguage: "Kannada",
    languages: ["Kannada", "Hindi", "English"],
    bio: "Devraj looks after school-going children in Juhu — homework, play time and safe pickups from school.",
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

type Spec = {
  id: string;
  name: string;
  role: string;
  city: string;
  state: string;
  lang: string;
  image: string;
  years: number;
  rateMin: number;
  rateMax: number;
  bio: string;
  services: string[];
  responsibilities: string[];
  skills: string[];
  reviews: [string, number, string][];
};

const SPECS: Spec[] = [
  {
    id: "sunil", name: "Bharath Nimkar", role: "Deep Cleaner", city: "Lucknow", state: "Uttar Pradesh",
    lang: "Awadhi", image: "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 7, rateMin: 260, rateMax: 380,
    bio: "Bharath handles move-in and festive deep cleans with steam machines and safe chemicals.",
    services: ["Full-home deep clean", "Sofa and carpet shampoo", "Kitchen degreasing", "Post-renovation clean"],
    responsibilities: ["Deep scrub floors, tiles and grouting", "Shampoo upholstery and mattresses", "Degrease chimney and kitchen slabs", "Dispose of waste responsibly"],
    skills: ["Steam cleaning", "Chemical safety", "Upholstery care", "Stain removal"],
    reviews: [["Preeti S.", 5, "Our kitchen chimney looks brand new."], ["Alok B.", 4, "Thorough job, finished on schedule."]],
  },
  {
    id: "harpreet", name: "Jaskiran Dholey", role: "Driver", city: "Amritsar", state: "Punjab",
    lang: "Punjabi", image: "https://images.pexels.com/photos/1197095/pexels-photo-1197095.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 12, rateMin: 200, rateMax: 300,
    bio: "Jaskiran is a calm, defensive driver with a clean record across city and highway runs.",
    services: ["Daily office commute", "School drop and pickup", "Outstation trips", "Airport transfers"],
    responsibilities: ["Drive family members safely on schedule", "Maintain vehicle cleanliness and fuel logs", "Coordinate servicing appointments", "Follow all traffic rules"],
    skills: ["Defensive driving", "Highway routes", "Basic car care", "Punctuality"],
    reviews: [["Manav K.", 5, "Twelve years experience really shows on highways."], ["Simran D.", 5, "Never late for school runs."]],
  },
  {
    id: "arjun-e", name: "Omkar Bhaledar", role: "Electrician", city: "Pune", state: "Maharashtra",
    lang: "Marathi", image: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 10, rateMin: 300, rateMax: 450,
    bio: "Licensed electrician for home wiring, fittings and emergency fault repairs.",
    services: ["Wiring and rewiring", "Fan, light and switch fitting", "Inverter and MCB work", "Fault diagnosis"],
    responsibilities: ["Diagnose and repair electrical faults", "Install fixtures and appliances safely", "Test earthing and load balance", "Advise on safe power usage"],
    skills: ["Licensed", "Load testing", "Inverter setup", "Safety compliance"],
    reviews: [["Ketan P.", 5, "Fixed a tripping issue three others missed."], ["Ritu A.", 4, "Neat wiring work, fair pricing."]],
  },
  {
    id: "mahesh", name: "Sarvesh Nikhade", role: "Plumber", city: "Nagpur", state: "Maharashtra",
    lang: "Marathi", image: "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 9, rateMin: 280, rateMax: 420,
    bio: "Sarvesh solves leaks, blockages and bathroom fittings with minimal breakage.",
    services: ["Leak and tap repair", "Drain unblocking", "Bathroom fitting installation", "Water tank cleaning"],
    responsibilities: ["Trace and seal leaks", "Clear blocked drains and traps", "Install taps, showers and flush systems", "Check water pressure and pumps"],
    skills: ["Leak detection", "Pipe fitting", "Pump repair", "Tile-safe work"],
    reviews: [["Sneha W.", 5, "No wall breaking needed — impressive."], ["Imran S.", 5, "Came within an hour for an emergency leak."]],
  },
  {
    id: "faisal", name: "Rehaan Qadeeri", role: "AC Technician", city: "Hyderabad", state: "Telangana",
    lang: "Telugu", image: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 8, rateMin: 320, rateMax: 500,
    bio: "Rehaan services split and window ACs — gas top-ups, installs and annual maintenance.",
    services: ["AC servicing and jet wash", "Gas refilling", "Installation and uninstallation", "Annual maintenance contracts"],
    responsibilities: ["Clean filters, coils and drainage", "Check gas pressure and refill", "Install and mount indoor/outdoor units", "Advise on energy-efficient usage"],
    skills: ["Split & window AC", "Gas charging", "Copper brazing", "AMC planning"],
    reviews: [["Vijay R.", 5, "Cooling improved instantly after the service."], ["Zoya H.", 4, "Clean work, covered the floor properly."]],
  },
  {
    id: "gopal", name: "Chirayu Marwal", role: "Carpenter", city: "Jaipur", state: "Rajasthan",
    lang: "Rajasthani", image: "https://images.pexels.com/photos/5974059/pexels-photo-5974059.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 15, rateMin: 300, rateMax: 480,
    bio: "Chirayu builds and repairs modular furniture, wardrobes and doors with fine finishing.",
    services: ["Furniture repair", "Modular wardrobe work", "Door and lock fitting", "Custom shelving"],
    responsibilities: ["Measure and build custom woodwork", "Repair hinges, drawers and frames", "Fit locks and handles", "Polish and finish surfaces"],
    skills: ["Modular fitting", "Polishing", "Measurement", "Hardware fitting"],
    reviews: [["Nidhi C.", 5, "Beautiful wardrobe finishing."], ["Pankaj L.", 5, "Repaired an old teak bed like new."]],
  },
  {
    id: "ramesh-p", name: "Nandkishor Bariya", role: "Painter", city: "Patna", state: "Bihar",
    lang: "Bhojpuri", image: "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 11, rateMin: 240, rateMax: 360,
    bio: "Nandkishor does interior and exterior painting with clean masking and dust control.",
    services: ["Interior wall painting", "Exterior weatherproofing", "Texture and stencil work", "Putty and primer"],
    responsibilities: ["Prepare and putty surfaces", "Apply primer and finish coats", "Mask furniture and floors", "Clean up after completion"],
    skills: ["Texture finishes", "Waterproofing", "Colour matching", "Dust control"],
    reviews: [["Shalini G.", 5, "Zero mess and a flawless finish."], ["Deepak N.", 4, "Good rates for a full 2BHK."]],
  },
  {
    id: "kartik", name: "Vihaan Kollipara", role: "Pest Control", city: "Vijayawada", state: "Andhra Pradesh",
    lang: "Telugu", image: "https://images.pexels.com/photos/5217880/pexels-photo-5217880.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 6, rateMin: 260, rateMax: 400,
    bio: "Vihaan uses child- and pet-safe treatments for cockroaches, termites and mosquitoes.",
    services: ["Cockroach and ant control", "Termite treatment", "Mosquito fogging", "Rodent control"],
    responsibilities: ["Inspect and identify infestation sources", "Apply safe, certified treatments", "Seal entry points", "Schedule follow-up visits"],
    skills: ["Herbal options", "Termite proofing", "Safety protocols", "Follow-up care"],
    reviews: [["Lavanya M.", 5, "Roach-free for six months now."], ["Suresh V.", 5, "Safe for our toddler and dog."]],
  },
  {
    id: "ishita", name: "Rupsha Talukdar", role: "Home Organizer", city: "Kolkata", state: "West Bengal",
    lang: "Bengali", image: "https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 5, rateMin: 300, rateMax: 450,
    bio: "Rupsha declutters wardrobes, kitchens and storage rooms into simple, findable systems.",
    services: ["Wardrobe organising", "Kitchen and pantry systems", "Storage decluttering", "Move-in setup"],
    responsibilities: ["Sort, categorise and label belongings", "Design storage layouts", "Advise on donation and disposal", "Maintain systems on follow-up visits"],
    skills: ["Decluttering", "Labelling systems", "Space planning", "Minimalism"],
    reviews: [["Ananya D.", 5, "Our kitchen finally makes sense."], ["Rahul B.", 4, "Great systems that actually stick."]],
  },
  {
    id: "joseph", name: "Elvino Sequira", role: "Pool Cleaner", city: "Panaji", state: "Goa",
    lang: "Konkani", image: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 7, rateMin: 280, rateMax: 420,
    bio: "Elvino maintains villa pools — chemistry balance, filtration and weekly cleaning.",
    services: ["Weekly pool cleaning", "Water chemistry balancing", "Filter and pump servicing", "Algae treatment"],
    responsibilities: ["Skim, brush and vacuum the pool", "Test and balance chlorine and pH", "Service filters and pumps", "Report equipment issues early"],
    skills: ["Water testing", "Filtration systems", "Algae control", "Pump maintenance"],
    reviews: [["Miguel R.", 5, "Pool water is crystal clear all season."], ["Tanya F.", 5, "Very reliable weekly visits."]],
  },
  {
    id: "balwant", name: "Yashvir Kanwal", role: "Security Guard", city: "Shimla", state: "Himachal Pradesh",
    lang: "Pahari", image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 14, rateMin: 180, rateMax: 280,
    bio: "Ex-serviceman Yashvir handles gate duty, visitor logs and night patrols.",
    services: ["Day and night gate duty", "Visitor screening", "Patrol rounds", "CCTV monitoring"],
    responsibilities: ["Screen and log all visitors", "Patrol the premises at set intervals", "Monitor CCTV feeds", "Respond to emergencies and alarms"],
    skills: ["Ex-serviceman", "CCTV monitoring", "Emergency response", "Visitor logging"],
    reviews: [["Society Sec.", 5, "Disciplined and alert on every shift."], ["Neeraj S.", 4, "Polite with guests, strict on entry."]],
  },
  {
    id: "lakshmi", name: "Sharanya Velmuri", role: "Gardener", city: "Chennai", state: "Tamil Nadu",
    lang: "Tamil", image: "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 10, rateMin: 200, rateMax: 320,
    bio: "Sharanya tends terrace gardens and lawns, from composting to seasonal planting.",
    services: ["Lawn mowing and edging", "Terrace and balcony gardens", "Composting setup", "Seasonal planting"],
    responsibilities: ["Water, prune and fertilise plants", "Mow and maintain lawns", "Set up and manage compost", "Control pests organically"],
    skills: ["Organic gardening", "Composting", "Pruning", "Plant health"],
    reviews: [["Bhavani R.", 5, "My terrace is a jungle now, in the best way."], ["Arun S.", 5, "Knows exactly which plants survive Chennai heat."]],
  },
  {
    id: "pooja", name: "Anvika Pathodia", role: "Laundry Specialist", city: "Indore", state: "Madhya Pradesh",
    lang: "Hindi", image: "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 6, rateMin: 170, rateMax: 250,
    bio: "Anvika handles washing, ironing and delicate fabric care including sarees.",
    services: ["Washing and drying", "Ironing and folding", "Saree and silk care", "Stain treatment"],
    responsibilities: ["Sort and wash by fabric type", "Iron and fold neatly", "Treat stains before washing", "Care for delicate garments"],
    skills: ["Fabric care", "Stain removal", "Ironing", "Saree folding"],
    reviews: [["Meenal T.", 5, "My silk sarees have never been safer."], ["Gaurav J.", 4, "Crisp ironing every single time."]],
  },
  {
    id: "tenzin", name: "Pemba Lachungpa", role: "Pet Care Assistant", city: "Gangtok", state: "Sikkim",
    lang: "Nepali", image: "https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600",
    years: 4, rateMin: 220, rateMax: 340,
    bio: "Pemba walks, feeds and grooms dogs and cats, and handles vet visits.",
    services: ["Daily dog walking", "Feeding and grooming", "Vet visit accompaniment", "Pet sitting while you travel"],
    responsibilities: ["Walk and exercise pets daily", "Feed on schedule and refresh water", "Basic grooming and bathing", "Watch for health changes"],
    skills: ["Dog handling", "Grooming", "Pet first aid", "Patience"],
    reviews: [["Dolma L.", 5, "Our beagle waits by the door for him."], ["Rina P.", 5, "Sent photos every day while we travelled."]],
  },
];

const DEFAULT_AVAILABILITY: Availability[] = [
  { day: "Mon–Fri", hours: "9:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "On request" },
];

for (const s of SPECS) {
  helpers.push({
    id: s.id,
    name: s.name,
    role: s.role,
    image: s.image,
    city: s.city,
    state: s.state,
    nativeLanguage: s.lang,
    languages: [s.lang, "Hindi", "English"],
    bio: s.bio,
    experienceYears: s.years,
    rateMin: s.rateMin,
    rateMax: s.rateMax,
    services: s.services,
    responsibilities: s.responsibilities,
    skills: s.skills,
    availability: DEFAULT_AVAILABILITY,
    reviews: s.reviews.map(([author, rating, text]) => ({ author, rating, text })),
  });
}

export function getHelperById(id: string): Helper | undefined {
  return helpers.find((h) => h.id === id);
}

