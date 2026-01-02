// src/data/mockData.js
export const MOCK_MENTORS = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    role: "Software Engineer", 
    company: "TechCorp", 
    category: "Information Technology", 
    rating: 4.9, 
    reviews: 124, 
    avatar: "https://i.pravatar.cc/150?u=1",
    availability: "Available",
    price: 60,
    slots: [
      { 
        id: "s1", 
        start_date: "2025-12-22T10:00:00.000Z", 
        end_date: "2025-12-22T11:00:00.000Z",
        day: "Monday",
        date: "Dec 22, 2025",
        time: "10:00 AM - 11:00 AM"
      },
      { 
        id: "s2", 
        start_date: "2025-12-24T14:00:00.000Z", 
        end_date: "2025-12-24T15:00:00.000Z",
        day: "Wednesday",
        date: "Dec 24, 2025",
        time: "02:00 PM - 03:00 PM"
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Financial Analyst",
    company: "WealthWise",
    category: "Banking & Finance",
    rating: 4.8,
    reviews: 89,
    avatar: "https://i.pravatar.cc/150?u=2",
    availability: "Fully Booked",
    price: 75,
    slots: []
  }
];