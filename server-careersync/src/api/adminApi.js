/**
 * Admin API Service
 * Centralized API calls for admin dashboard
 */
import api from './axiosConfig';

/**
 * Get admin dashboard overview
 * GET /api/admin/dashboard
 * Returns: { stats, monthlyBookingsRevenue, topMentors, recentActivity }
 */
export const getAdminDashboard = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    throw error;
  }
};

/**
 * Get mentor statistics
 * GET /api/admin/mentors/stats
 * Returns mentor-related statistics
 */
export const getMentorStats = async () => {
  try {
    const response = await api.get('/admin/mentors/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching mentor stats:', error);
    throw error;
  }
};


