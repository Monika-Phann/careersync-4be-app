// Auth utility for mentor platform
// Handles token and user data from localStorage or URL params

export const getAuthToken = () => {
  // First check URL params (from redirect)
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');
  
  if (tokenFromUrl) {
    // Store in localStorage for future use (both keys for compatibility)
    localStorage.setItem('accessToken', tokenFromUrl);
    localStorage.setItem('token', tokenFromUrl);
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
    return tokenFromUrl;
  }
  
  // Check both 'token' and 'accessToken' for compatibility
  return localStorage.getItem('token') || localStorage.getItem('accessToken');
};

export const getUserData = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      // Silently handle parsing error
      return null;
    }
  }
  return null;
};

export const setUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

