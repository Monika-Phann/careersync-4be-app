import axiosInstance from './axiosInstance';

// Get mentor's own profile (from mentor endpoint)
export const getMyMentorProfile = async () => {
  try {
    const response = await axiosInstance.get('/mentors/me/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update mentor profile
export const updateMentorProfile = async (data, profileImage) => {
  try {
    const formData = new FormData();
    
    // Append profile image if provided
    if (profileImage instanceof File) {
      formData.append('profile_image', profileImage);
    }
    
    // Append all other fields to FormData
    Object.keys(data).forEach(key => {
      // Skip profile_image key if it's not a File
      if (key === 'profile_image') return;
      
      const value = data[key];
      
      // Include null values and empty strings for optional fields
      // Only skip undefined values
      if (value !== undefined) {
        // Handle arrays and objects by stringifying them
        if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
          formData.append(key, JSON.stringify(value));
        } else {
          // Convert to string for FormData
          formData.append(key, value === null ? '' : String(value));
        }
      }
    });
    
    const response = await axiosInstance.put('/mentors/me/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change mentor password
export const changeMentorPassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.put('/mentors/me/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    // Re-throw with more context
    if (error.response?.data?.message) {
      const customError = new Error(error.response.data.message);
      customError.response = error.response;
      throw customError;
    }
    throw error;
  }
};

