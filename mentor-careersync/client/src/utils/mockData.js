// Dashboard Stats
export const dashboardStats = {
  totalBookings: {
    value: 1234,
    change: 12.5,
    icon: 'calendar',
  },
  totalRevenue: {
    value: 68532,
    change: 8.2,
    icon: 'dollar',
  },
  certifications: {
    value: 856,
    change: 15.3,
    icon: 'certificate',
  },
  activeUsers: {
    value: 2459,
    change: 6.7,
    icon: 'users',
  },
}

// Revenue & Bookings Trend Data
export const revenueBookingsData = [
  { month: 'Jan', bookings: 450, revenue: 25000 },
  { month: 'Feb', bookings: 520, revenue: 28000 },
  { month: 'Mar', bookings: 480, revenue: 26000 },
  { month: 'Apr', bookings: 610, revenue: 33000 },
  { month: 'May', bookings: 680, revenue: 37000 },
  { month: 'Jun', bookings: 720, revenue: 39000 },
  { month: 'Jul', bookings: 780, revenue: 42000 },
  { month: 'Aug', bookings: 750, revenue: 41000 },
  { month: 'Sep', bookings: 690, revenue: 38000 },
  { month: 'Oct', bookings: 640, revenue: 35000 },
  { month: 'Nov', bookings: 600, revenue: 33000 },
]

// Weekly Performance Data
export const weeklyPerformanceData = [
  { day: 'Mon', completed: 45, incomplete: 12, canceled: 8 },
  { day: 'Tue', completed: 52, incomplete: 10, canceled: 6 },
  { day: 'Wed', completed: 68, incomplete: 8, canceled: 5 },
  { day: 'Thu', completed: 72, incomplete: 6, canceled: 4 },
  { day: 'Fri', completed: 58, incomplete: 9, canceled: 7 },
  { day: 'Sat', completed: 35, incomplete: 5, canceled: 3 },
  { day: 'Sun', completed: 28, incomplete: 4, canceled: 2 },
]

// Today's Schedule
export const todaysSchedule = [
  {
    time: '09:00 AM',
    name: 'Michael Chen',
    duration: '6 hour',
  },
  {
    time: '02:00 PM',
    name: 'James Wilson',
    duration: '2 hours',
  },
]

// Recent Bookings
export const recentBookings = [
  {
    id: 'BK-2025-1001',
    user: {
      initials: 'JS',
      name: 'John Smith',
      email: 'john.smith@email.com',
    },
    program: 'Career Consultation',
    date: '2025-11-15',
    status: 'Completed',
  },
  {
    id: 'BK-2025-1002',
    user: {
      initials: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
    },
    program: 'Material Review',
    date: '2025-11-16',
    status: 'Incomplete',
  },
  {
    id: 'BK-2025-1003',
    user: {
      initials: 'MB',
      name: 'Mike Brown',
      email: 'mike.b@email.com',
    },
    program: 'Interview Prep',
    date: '2025-11-17',
    status: 'Completed',
  },
  {
    id: 'BK-2025-1004',
    user: {
      initials: 'ED',
      name: 'Emily Davis',
      email: 'emily.d@email.com',
    },
    program: 'Career Coaching',
    date: '2025-11-18',
    status: 'Completed',
  },
]

// Quick Stats
export const quickStats = {
  completionRate: 94.5,
  incompleteReviews: 23,
  cancellations: 12,
  cancellationPercentage: 2.7,
}

