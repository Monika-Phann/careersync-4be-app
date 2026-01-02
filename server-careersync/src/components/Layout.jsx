// carrear-frontend-admin/src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Header from './Header';
import '../assets/css/components/layout.css'; // Import layout CSS

/**
 * Layout component for the Admin Dashboard.
 * Provides consistent structure (Sidebar and Header) for all protected routes.
 * Uses <Outlet /> to render child route components.
 */
const Layout = () => {
  return (
    <div className="admin-layout-container">
      
      {/* Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="admin-content-wrapper">
        
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="admin-main-content">
          {/* Renders the matched route component */}
          <Outlet /> 
        </main>
        
      </div>
    </div>
  );
};

export default Layout;