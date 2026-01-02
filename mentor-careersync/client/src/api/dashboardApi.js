import axiosInstance from './axiosInstance';

/**
 * Get dashboard summary (bookings, revenue, certifications with growth %)
 * @param {string} mentorId - The mentor's ID
 * @returns {Promise} Dashboard summary data
 */
export const getDashboardSummary = async (mentorId) => {
  try {
    const response = await axiosInstance.get(`/dashboard/summary/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw error;
  }
};

/**
 * Get revenue and bookings trends for the last 12 months
 * @param {string} mentorId - The mentor's ID
 * @returns {Promise} Array of monthly trend data
 */
export const getTrends = async (mentorId) => {
  try {
    const response = await axiosInstance.get(`/analytics/trends/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trends:', error);
    throw error;
  }
};

/**
 * Get weekly performance data
 * @param {string} mentorId - The mentor's ID
 * @returns {Promise} Weekly performance data
 */
export const getWeeklyPerformance = async (mentorId) => {
  try {
    const response = await axiosInstance.get(`/dashboard/weekly?mentorId=${mentorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly performance:', error);
    throw error;
  }
};



