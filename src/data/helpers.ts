import helperCleaner from "@/assets/helper-cleaner.jpg";
import helperCook from "@/assets/helper-cook.jpg";
import helperNanny from "@/assets/helper-nanny.jpg";
import helperGardener from "@/assets/helper-gardener.jpg";
import helperHandyman from "@/assets/helper-handyman.jpg";
import helperLaundry from "@/assets/helper-laundry.jpg";
import helperPetcare from "@/assets/helper-petcare.jpg";
import helperEldercare from "@/assets/helper-eldercare.jpg";

export type Review = {
  author: string;
  rating: number;
  text: string;
};

export type Helper = {
  id: string;
  name: string;
  role: string;
  image: string;
  rateMin: number;
  rateMax: number;
  state: string;
  city: string;
  nativeLanguage: string;
  responsibilities: string[];
  skills: string[];
  bio: string;
  experienceYears: number;
  languages: string[];
  services: string[];
  availability: { day: string; hours: string }[];
  reviews: Review[];
};

// Rates below are per hour in INR.
export const helpers: Helper[] = [
  {
    id: "h1",
    name: "Lakshmi Iyer",
    role: "House Cleaner",
    image: helperCleaner,
    rateMin: 180,
    rateMax: 260,
    state: "Tamil Nadu",
    city: "Chennai",
    nativeLanguage: "Tamil",
    responsibilities: [
      "Sweeping, mopping and dusting all rooms",
      "Kitchen and bathroom deep cleaning",
      "Washing utensils and drying them",
      "Taking out trash and organizing clutter",
    ],
    skills: ["Attention to detail", "Eco-friendly products", "Punctual", "Trustworthy"],
    bio: "Lakshmi has cleaned homes across Chennai for over a decade. Families love her spotless kitchens and her respectful, quiet manner.",
    experienceYears: 11,
    languages: ["Tamil", "English", "Hindi"],
    services: ["Daily cleaning", "Weekly deep clean", "Festival / Pongal cleaning", "Post-renovation clean"],
    availability: [
      { day: "Mon – Sat", hours: "7:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Half day" },
    ],
    reviews: [
      { author: "Ramya S., Adyar", rating: 5, text: "Lakshmi akka is punctual and the house shines after every visit." },
      { author: "Karthik V., T. Nagar", rating: 5, text: "Very honest and hardworking. Been with our family for 3 years." },
    ],
  },
  {
    id: "h2",
    name: "Anjali Sharma",
    role: "Home Cook",
    image: helperCook,
    rateMin: 220,
    rateMax: 320,
    state: "Delhi",
    city: "New Delhi",
    nativeLanguage: "Hindi",
    responsibilities: [
      "Planning weekly menus with the family",
      "Cooking fresh North Indian meals daily",
      "Grocery shopping and pantry stocking",
      "Cleaning the kitchen after cooking",
    ],
    skills: ["North & Punjabi cuisine", "Jain / no-onion-garlic meals", "Hygienic prep", "Quick and organized"],
    bio: "Anjali cooks classic ghar-ka-khana for busy Delhi families — from dal-chawal to a full weekend chole bhature spread.",
    experienceYears: 9,
    languages: ["Hindi", "Punjabi", "English"],
    services: ["Two-time daily cooking", "Party / dinner cooking", "Tiffin prep", "Jain / satvik menus"],
    availability: [
      { day: "Mon – Sat", hours: "9:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "By request" },
    ],
    reviews: [
      { author: "Neha K., Vasant Kunj", rating: 5, text: "Rotis softer than my nani's. Best decision we made this year." },
      { author: "Arvind M., Dwarka", rating: 4, text: "Very clean and quick. Timing is always on the dot." },
    ],
  },
  {
    id: "h3",
    name: "Meera Nair",
    role: "Nanny",
    image: helperNanny,
    rateMin: 200,
    rateMax: 300,
    state: "Kerala",
    city: "Kochi",
    nativeLanguage: "Malayalam",
    responsibilities: [
      "Child supervision and playtime",
      "Homework help and reading",
      "Preparing simple meals and snacks",
      "Bath, nap and bedtime routines",
    ],
    skills: ["First aid / CPR certified", "Patient with toddlers", "Craft & activity planning", "Reliable"],
    bio: "Meera is a certified early-childhood carer from Kochi who has looked after infants and school-age kids for six years.",
    experienceYears: 6,
    languages: ["Malayalam", "English", "Hindi"],
    services: ["Full-time nanny", "After-school care", "Newborn care", "Weekend babysitting"],
    availability: [
      { day: "Mon – Fri", hours: "7:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "Evenings" },
    ],
    reviews: [
      { author: "Anu J., Kakkanad", rating: 5, text: "Our daughter adores her. Meera treats her like family." },
      { author: "Reji P., Fort Kochi", rating: 5, text: "Trustworthy and gentle. She sends photo updates every day." },
    ],
  },
  {
    id: "h4",
    name: "Ravi Patel",
    role: "Gardener",
    image: helperGardener,
    rateMin: 190,
    rateMax: 280,
    state: "Gujarat",
    city: "Ahmedabad",
    nativeLanguage: "Gujarati",
    responsibilities: [
      "Lawn mowing and hedge trimming",
      "Planting, weeding and fertilizing",
      "Seasonal yard cleanup",
      "Watering schedules and pest checks",
    ],
    skills: ["Plant & soil knowledge", "Drip irrigation setup", "Composting", "Tool safety"],
    bio: "Ravi bhai runs a small nursery in Ahmedabad and designs low-water, tropical-friendly gardens for bungalows and terraces.",
    experienceYears: 14,
    languages: ["Gujarati", "Hindi", "English"],
    services: ["Weekly lawn care", "Terrace garden design", "Kitchen garden setup", "Monsoon cleanup"],
    availability: [
      { day: "Tue – Sun", hours: "6:30 AM – 2:00 PM" },
      { day: "Monday", hours: "Off" },
    ],
    reviews: [
      { author: "Hetal D., Bodakdev", rating: 5, text: "Our terrace looks like a small farm now. Highly recommended." },
      { author: "Sunil P., Satellite", rating: 4, text: "Brings his own tools, very knowledgeable about plants." },
    ],
  },
  {
    id: "h5",
    name: "Suresh Reddy",
    role: "Handyman",
    image: helperHandyman,
    rateMin: 250,
    rateMax: 400,
    state: "Telangana",
    city: "Hyderabad",
    nativeLanguage: "Telugu",
    responsibilities: [
      "Minor plumbing and electrical fixes",
      "Furniture assembly and wall mounting",
      "Door, lock and window repairs",
      "Preventive home maintenance checks",
    ],
    skills: ["Licensed electrician", "Plumbing basics", "Drilling & mounting", "Problem solver"],
    bio: "Suresh has 15 years of building-maintenance experience across Hyderabad apartments and villas. No job too small.",
    experienceYears: 15,
    languages: ["Telugu", "Hindi", "English"],
    services: ["Small plumbing & electrical", "Furniture assembly", "Wall mounting & drilling", "Quarterly checkups"],
    availability: [
      { day: "Mon – Sat", hours: "8:00 AM – 7:00 PM" },
      { day: "Sunday", hours: "Emergencies" },
    ],
    reviews: [
      { author: "Priyanka G., Gachibowli", rating: 5, text: "Fixed a leaking tap and mounted 3 shelves in one visit." },
      { author: "Mohan R., Banjara Hills", rating: 5, text: "Neat work, fair pricing. Our building-wide favourite." },
    ],
  },
  {
    id: "h6",
    name: "Kavita Deshmukh",
    role: "Laundry & Ironing",
    image: helperLaundry,
    rateMin: 150,
    rateMax: 230,
    state: "Maharashtra",
    city: "Pune",
    nativeLanguage: "Marathi",
    responsibilities: [
      "Washing, drying and folding clothes",
      "Ironing shirts, sarees and linens",
      "Sorting laundry by fabric & colour",
      "Cleaning washer and dryer surfaces",
    ],
    skills: ["Fabric care", "Stain treatment", "Saree pleating", "Organized"],
    bio: "Kavita tai handles laundry for families across Kothrud and Baner. Delicate silks and cotton kurtas come back looking new.",
    experienceYears: 7,
    languages: ["Marathi", "Hindi", "English"],
    services: ["Wash, dry & fold", "Ironing & steaming", "Saree care", "Wardrobe organization"],
    availability: [
      { day: "Mon – Sat", hours: "9:00 AM – 5:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    reviews: [
      { author: "Sneha B., Kothrud", rating: 5, text: "My silk sarees have never looked better. Very careful." },
      { author: "Rohan I., Baner", rating: 4, text: "Reliable and neat folding, ironing is crisp." },
    ],
  },
  {
    id: "h7",
    name: "Arjun Singh",
    role: "Pet Care Helper",
    image: helperPetcare,
    rateMin: 200,
    rateMax: 300,
    state: "Punjab",
    city: "Amritsar",
    nativeLanguage: "Punjabi",
    responsibilities: [
      "Dog walking and outdoor playtime",
      "Feeding pets on schedule",
      "Cleaning pet areas and litter boxes",
      "Basic grooming and medication reminders",
    ],
    skills: ["Confident with large breeds", "Pet first aid", "Photo updates", "House-key trustworthy"],
    bio: "Arjun grew up around farm dogs and now looks after Labradors, Indies and Persians across Amritsar and beyond.",
    experienceYears: 6,
    languages: ["Punjabi", "Hindi", "English"],
    services: ["Daily dog walking", "Drop-in visits", "Overnight pet sitting", "Vet visit transport"],
    availability: [
      { day: "Every day", hours: "6:00 AM – 9:00 PM" },
      { day: "Overnight", hours: "By request" },
    ],
    reviews: [
      { author: "Simran K., Ranjit Avenue", rating: 5, text: "Our German Shepherd waits by the door for Arjun paaji." },
      { author: "Harpreet S., Model Town", rating: 5, text: "Sends walk photos every day. Very responsible boy." },
    ],
  },
  {
    id: "h8",
    name: "Sunita Banerjee",
    role: "Elder Care Companion",
    image: helperEldercare,
    rateMin: 240,
    rateMax: 340,
    state: "West Bengal",
    city: "Kolkata",
    nativeLanguage: "Bengali",
    responsibilities: [
      "Companionship and conversation",
      "Medication reminders",
      "Light mobility assistance",
      "Simple meal prep and errands",
    ],
    skills: ["Patient & warm", "CPR certified", "Dementia experience", "Clear family communication"],
    bio: "Sunita di has cared for seniors in Kolkata's Ballygunge and Salt Lake for nearly a decade, including post-surgery recovery.",
    experienceYears: 9,
    languages: ["Bengali", "Hindi", "English"],
    services: ["Daytime companion", "Medication & appointment reminders", "Meal prep", "Errands & grocery"],
    availability: [
      { day: "Mon – Sat", hours: "8:00 AM – 6:00 PM" },
      { day: "Sunday", hours: "Off" },
    ],
    reviews: [
      { author: "Debashree M., Salt Lake", rating: 5, text: "Ma looks forward to Sunita didi's visits. Very kind." },
      { author: "Arindam G., Ballygunge", rating: 5, text: "She noticed early signs of infection and alerted us. Grateful." },
    ],
  },
  {
    id: "h9",
    name: "Priya Menon",
    role: "House Cleaner",
    image: helperCleaner,
    rateMin: 190,
    rateMax: 270,
    state: "Karnataka",
    city: "Bengaluru",
    nativeLanguage: "Kannada",
    responsibilities: [
      "Full-home sweeping and mopping",
      "Bathroom sanitization",
      "Kitchen counter and appliance cleaning",
      "Balcony and window cleaning",
    ],
    skills: ["Detail oriented", "Quiet worker", "Safe with pets", "Reliable"],
    bio: "Priya has cleaned apartments across Koramangala and Indiranagar for 5 years. She specializes in tech-worker homes with pets.",
    experienceYears: 5,
    languages: ["Kannada", "Tamil", "English"],
    services: ["Weekly cleaning", "Deep clean", "Move-in / move-out", "Post-party cleanup"],
    availability: [
      { day: "Mon – Fri", hours: "8:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
    ],
    reviews: [
      { author: "Aditya R., Koramangala", rating: 5, text: "Our two cats love her. Home is spotless every week." },
      { author: "Shwetha N., Indiranagar", rating: 4, text: "Very consistent quality, never miss a spot." },
    ],
  },
  {
    id: "h10",
    name: "Rajesh Kumar",
    role: "Home Cook",
    image: helperCook,
    rateMin: 200,
    rateMax: 300,
    state: "Uttar Pradesh",
    city: "Lucknow",
    nativeLanguage: "Hindi",
    responsibilities: [
      "Cooking authentic Awadhi meals",
      "Making dal, sabzi, roti and rice daily",
      "Weekend biryani and kebab prep",
      "Kitchen cleanup after cooking",
    ],
    skills: ["Awadhi & Mughlai cuisine", "Dum cooking", "Halal-friendly", "Menu planning"],
    bio: "Rajesh bhaiya trained under an old Lucknow khansama and cooks slow-dum biryanis, kormas and shami kebabs to order.",
    experienceYears: 12,
    languages: ["Hindi", "Urdu", "English"],
    services: ["Daily cooking", "Weekend biryani", "Dinner parties", "Special occasion menus"],
    availability: [
      { day: "Mon – Sat", hours: "10:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "Half day" },
    ],
    reviews: [
      { author: "Farhan A., Hazratganj", rating: 5, text: "His galouti kebabs melt in the mouth. Family favourite." },
      { author: "Meenakshi T., Gomti Nagar", rating: 5, text: "Clean, punctual, respectful. A gem of a cook." },
    ],
  },
  {
    id: "h11",
    name: "Deepa Krishnan",
    role: "Nanny",
    image: helperNanny,
    rateMin: 190,
    rateMax: 280,
    state: "Tamil Nadu",
    city: "Coimbatore",
    nativeLanguage: "Tamil",
    responsibilities: [
      "Infant and toddler care",
      "Bath, feed and nap schedules",
      "School drop and pickup",
      "Homework and reading time",
    ],
    skills: ["Newborn care", "Patient", "First aid", "Storytelling"],
    bio: "Deepa aunty has helped raise five babies over her career. She is especially loved for her Tamil lullabies and endless patience.",
    experienceYears: 10,
    languages: ["Tamil", "English"],
    services: ["Full-time nanny", "Newborn night care", "Toddler day care", "School run"],
    availability: [
      { day: "Mon – Fri", hours: "7:00 AM – 7:00 PM" },
      { day: "Weekends", hours: "By request" },
    ],
    reviews: [
      { author: "Vidya S., R.S. Puram", rating: 5, text: "Our baby sleeps through the night since Deepa aunty joined." },
      { author: "Prakash M., Peelamedu", rating: 5, text: "Warm, careful, and incredibly patient." },
    ],
  },
  {
    id: "h12",
    name: "Vikram Chauhan",
    role: "Handyman",
    image: helperHandyman,
    rateMin: 230,
    rateMax: 360,
    state: "Rajasthan",
    city: "Jaipur",
    nativeLanguage: "Hindi",
    responsibilities: [
      "Electrical fittings and switch repairs",
      "Plumbing leaks and tap replacements",
      "Painting touch-ups and drywall patching",
      "Furniture repair and assembly",
    ],
    skills: ["Electrical & plumbing", "Painting", "Woodwork basics", "Punctual"],
    bio: "Vikram runs a small maintenance crew in Jaipur and personally handles homes in C-Scheme, Malviya Nagar and Vaishali.",
    experienceYears: 13,
    languages: ["Hindi", "Marwari", "English"],
    services: ["Home repairs", "Painting", "Furniture assembly", "Annual maintenance contracts"],
    availability: [
      { day: "Mon – Sat", hours: "8:00 AM – 7:00 PM" },
      { day: "Sunday", hours: "Emergencies" },
    ],
    reviews: [
      { author: "Ritu S., Malviya Nagar", rating: 5, text: "Fixed 3 things in an hour. Fair price, no fuss." },
      { author: "Anil J., Vaishali Nagar", rating: 4, text: "Reliable and neat. Always cleans up after work." },
    ],
  },
  {
    id: "h13",
    name: "Rina Das",
    role: "Laundry & Ironing",
    image: helperLaundry,
    rateMin: 140,
    rateMax: 210,
    state: "Assam",
    city: "Guwahati",
    nativeLanguage: "Assamese",
    responsibilities: [
      "Wash, dry and fold clothing",
      "Ironing mekhela chadors and cotton kurtas",
      "Delicate hand-wash items",
      "Wardrobe rotation for seasons",
    ],
    skills: ["Delicate fabrics", "Traditional-wear care", "Stain removal", "Neat folding"],
    bio: "Rina baideo handles traditional Assamese silk and everyday laundry for families in Guwahati with equal care.",
    experienceYears: 6,
    languages: ["Assamese", "Hindi", "English"],
    services: ["Wash, dry & fold", "Traditional-wear ironing", "Delicate care", "Seasonal wardrobe swap"],
    availability: [
      { day: "Mon – Sat", hours: "9:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    reviews: [
      { author: "Nabanita B., Beltola", rating: 5, text: "My muga silk mekhela is always handled beautifully." },
      { author: "Pranab S., Zoo Road", rating: 4, text: "Very consistent, reasonable rates." },
    ],
  },
  {
    id: "h14",
    name: "Manoj Yadav",
    role: "Gardener",
    image: helperGardener,
    rateMin: 170,
    rateMax: 260,
    state: "Bihar",
    city: "Patna",
    nativeLanguage: "Bhojpuri",
    responsibilities: [
      "Lawn upkeep and weeding",
      "Vegetable and herb garden care",
      "Fertilizing and pest control",
      "Seasonal replanting",
    ],
    skills: ["Kitchen garden expert", "Organic pest control", "Composting", "Hardworking"],
    bio: "Manoj bhaiya grew up in a farming family near Patna and now maintains kitchen gardens and lawns for city homes.",
    experienceYears: 8,
    languages: ["Bhojpuri", "Hindi", "English"],
    services: ["Weekly gardening", "Kitchen garden setup", "Composting help", "Tree pruning"],
    availability: [
      { day: "Mon – Sat", hours: "6:30 AM – 2:00 PM" },
      { day: "Sunday", hours: "Off" },
    ],
    reviews: [
      { author: "Sarita M., Boring Road", rating: 5, text: "We now grow our own tomatoes and methi thanks to him." },
      { author: "Amit K., Kankarbagh", rating: 4, text: "Punctual and knowledgeable about soil." },
    ],
  },
  {
    id: "h15",
    name: "Farida Sheikh",
    role: "Home Cook",
    image: helperCook,
    rateMin: 210,
    rateMax: 310,
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    nativeLanguage: "Urdu",
    responsibilities: [
      "Andhra and Hyderabadi meals",
      "Spicy pickles and podis",
      "Grocery shopping",
      "Kitchen cleanup",
    ],
    skills: ["Andhra spice mastery", "Hyderabadi biryani", "Halal-friendly", "Hygienic prep"],
    bio: "Farida aapa cooks fiery Andhra thalis and slow-dum biryanis. She adjusts spice for kids and elders with ease.",
    experienceYears: 11,
    languages: ["Urdu", "Telugu", "Hindi", "English"],
    services: ["Two-time cooking", "Party biryani", "Pickle making", "Fasting-month menus"],
    availability: [
      { day: "Mon – Sat", hours: "9:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "By request" },
    ],
    reviews: [
      { author: "Zainab R., MVP Colony", rating: 5, text: "Best biryani outside a wedding. Amazing hands." },
      { author: "Kiran P., Seethammadhara", rating: 5, text: "Very clean cooking, kids love the pappu." },
    ],
  },
  {
    id: "h16",
    name: "Geeta Joshi",
    role: "Elder Care Companion",
    image: helperEldercare,
    rateMin: 220,
    rateMax: 320,
    state: "Uttarakhand",
    city: "Dehradun",
    nativeLanguage: "Garhwali",
    responsibilities: [
      "Companionship and light conversation",
      "Medication reminders",
      "Walks and physiotherapy support",
      "Simple pahadi meals",
    ],
    skills: ["Warm and patient", "First aid", "Basic physio support", "Dementia friendly"],
    bio: "Geeta ji is a trained caregiver from Dehradun who supports elders through recovery, dementia and everyday companionship.",
    experienceYears: 8,
    languages: ["Garhwali", "Hindi", "English"],
    services: ["Daytime companion", "Post-surgery recovery", "Medication reminders", "Evening walks"],
    availability: [
      { day: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "10:00 AM – 3:00 PM" },
    ],
    reviews: [
      { author: "Shalini R., Rajpur Road", rating: 5, text: "Papa smiles more since Geeta ji started coming." },
      { author: "Naveen U., Dalanwala", rating: 5, text: "Very careful with medicines, calm presence." },
    ],
  },
];

export function getHelperById(id: string): Helper | undefined {
  return helpers.find((h) => h.id === id);
}
