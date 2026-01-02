// carrear-frontend-public/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role, loading } = useAuth();
  
  // 1. Loading State (waiting for user check on page load)
  if (loading) {
    return <div>Loading user authentication...</div>;
  }
  
  // 2. Not Authenticated: Redirect to Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // 3. Authenticated: Check Role Match
  if (allowedRoles && allowedRoles.includes(role)) {
    // Role matches one of the allowed roles: Allow access
    return <Outlet />; 
    
  } else if (isAuthenticated) {
    // 4. Authenticated, but Role MISMATCH: Redirect to their appropriate dashboard
    const redirectMap = {
        'user': '/user/dashboard',
        'mentor': '/mentor/dashboard',
        'admin': 'http://localhost:5174/dashboard' // Redirect Admin to their separate FE URL
    };
    
    // Fallback redirect if role is unexpected, but generally redirects to their own space
    const redirectPath = redirectMap[role] || '/'; 
    
    // Special handling for external Admin redirect
    if (role === 'admin') {
         // Using window.location.href forces a full page reload to the Admin FE
         window.location.href = redirectPath; 
         return null; 
    }
    
    // Redirect to their assigned dashboard
    return <Navigate to={redirectPath} replace />;
  }
  
  // Fallback to login
  // return <Navigate to="/login" replace />;
};

export default ProtectedRoute;