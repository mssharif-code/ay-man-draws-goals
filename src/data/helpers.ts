export type Helper = {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  rate: number;
  location: string;
  responsibilities: string[];
};

export const helpers: Helper[] = [
  {
    id: "amara",
    name: "Amara Singh",
    role: "Home Cook",
    photo: "https://images.pexels.com/photos/4194619/pexels-photo-4194619.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    rate: 250,
    location: "Bandra, Mumbai",
    responsibilities: [
      "Plan and cook daily meals for the household",
      "Shop for fresh groceries and pantry staples",
      "Keep the kitchen clean and organised",
      "Accommodate dietary preferences and allergies",
    ],
  },
  {
    id: "rohan",
    name: "Rohan Patel",
    role: "Elder Care Assistant",
    photo: "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    rate: 320,
    location: "Powai, Mumbai",
    responsibilities: [
      "Provide companionship and conversation",
      "Assist with medication reminders",
      "Help with light mobility and exercise",
      "Prepare simple meals and snacks",
    ],
  },
  {
    id: "meera",
    name: "Meera Nair",
    role: "House Cleaner",
    photo: "https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    rate: 200,
    location: "Andheri, Mumbai",
    responsibilities: [
      "Sweep, mop, and dust all living areas",
      "Clean bathrooms and kitchen surfaces",
      "Laundry folding and bed-making",
      "Eco-friendly product options on request",
    ],
  },
  {
    id: "vikram",
    name: "Vikram Rao",
    role: "Child Care Assistant",
    photo: "https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    rate: 280,
    location: "Juhu, Mumbai",
    responsibilities: [
      "Supervise and play with children",
      "Help with homework and reading",
      "Prepare snacks and light meals",
      "Follow parents' routines and rules",
    ],
  },
];
