import axiosInstance from './axiosInstance';

/**
 * Get all timeslots for a mentor (across all sessions)
 * GET /api/timeslots
 * @returns {Promise<{success: boolean, data: Array, message: string}>}
 */
export const getAllTimeslots = async () => {
  try {
    const response = await axiosInstance.get('/timeslots');
    
    return {
      success: true,
      data: response.data.timeslots || [],
      message: response.data.message || 'Timeslots retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || error.message || 'Failed to fetch timeslots'
    };
  }
};

/**
 * Get timeslots for a specific session
 * GET /api/timeslots/:sessionId/timeslots
 * @param {string} sessionId - Session ID
 * @returns {Promise<{success: boolean, data: Array, message: string}>}
 */
export const getTimeslotsForSession = async (sessionId) => {
  try {
    const response = await axiosInstance.get(`/timeslots/${sessionId}/timeslots`);
    
    return {
      success: true,
      data: response.data.timeslots || [],
      message: response.data.message || 'Timeslots retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || error.message || 'Failed to fetch timeslots'
    };
  }
};

/**
 * Add timeslots to a session
 * POST /api/timeslots/:sessionId/timeslots
 * @param {string} sessionId - Session ID
 * @param {Array} timeslots - Array of timeslot objects with start_time and end_time
 * @returns {Promise<{success: boolean, data: Object, message: string}>}
 */
export const addTimeslots = async (sessionId, timeslots) => {
  try {
    // If sessionId is null/undefined, use the auto-create endpoint
    const endpoint = sessionId 
      ? `/timeslots/${sessionId}/timeslots`
      : `/timeslots/timeslots`;
    
    const response = await axiosInstance.post(endpoint, timeslots);
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Timeslots added successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'Failed to add timeslots'
    };
  }
};

/**
 * Update a timeslot
 * PUT /api/timeslots/timeslots/:timeslotId
 * @param {string} timeslotId - Timeslot ID
 * @param {Object} timeslotData - Updated timeslot data (start_time, end_time, etc.)
 * @returns {Promise<{success: boolean, data: Object, message: string}>}
 */
export const updateTimeslot = async (timeslotId, timeslotData) => {
  try {
    const response = await axiosInstance.put(`/timeslots/timeslots/${timeslotId}`, timeslotData);
    
    return {
      success: true,
      data: response.data.timeslot || response.data,
      message: response.data.message || 'Timeslot updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'Failed to update timeslot'
    };
  }
};

/**
 * Delete a timeslot
 * DELETE /api/timeslots/timeslots/:timeslotId
 * @param {string} timeslotId - Timeslot ID
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteTimeslot = async (timeslotId) => {
  try {
    const response = await axiosInstance.delete(`/timeslots/timeslots/${timeslotId}`);
    
    return {
      success: true,
      message: response.data.message || 'Timeslot deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to delete timeslot'
    };
  }
};

/**
 * Format timeslot data for display
 * @param {Object} timeslot - Raw timeslot data from API
 * @returns {Object} Formatted timeslot data
 */
export const formatTimeslotForDisplay = (timeslot) => {
  // Handle both start_time/end_time and start_date/end_date formats
  const startTime = timeslot.start_time ? new Date(timeslot.start_time) : 
                    (timeslot.start_date ? new Date(timeslot.start_date) : null);
  const endTime = timeslot.end_time ? new Date(timeslot.end_time) : 
                  (timeslot.end_date ? new Date(timeslot.end_date) : null);
  
  // Calculate duration in minutes
  const durationMinutes = startTime && endTime 
    ? Math.round((endTime - startTime) / 60000) 
    : 60; // Default 60 minutes
  
  // Format date
  const dateStr = startTime 
    ? startTime.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'TBD';
  
  // Format time
  const timeStr = startTime && endTime
    ? `${startTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })} - ${endTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}`
    : 'TBD';
  
  // Determine status - check if booked (has booking_id or Booking record)
  const isBooked = timeslot.is_booked || timeslot.booking_id || (timeslot.Booking && timeslot.Booking.id);
  const status = isBooked ? 'BOOKED' : 'AVAILABLE';
  
  // Get location from Session association
  const location = timeslot.Session?.location_name || 'TBD';
  
  // Get price from Session association
  const price = timeslot.Session?.price 
    ? `$${parseFloat(timeslot.Session.price).toFixed(0)}` 
    : '$0';
  
  return {
    id: timeslot.id,
    session_id: timeslot.session_id || timeslot.Session?.id,
    status,
    date: dateStr,
    duration: `${durationMinutes} min`,
    time: timeStr,
    location,
    price,
    start_time: timeslot.start_time || timeslot.start_date,
    end_time: timeslot.end_time || timeslot.end_date,
    is_booked: isBooked,
    booking_id: timeslot.booking_id || timeslot.Booking?.id,
    // Raw data for reference (including Booking with AccUser)
    raw: timeslot
  };
};

