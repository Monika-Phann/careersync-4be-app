// carrear-frontend-admin/src/components/AdminSidebar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import  '../assets/css/components/sidebar.css';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'User Management', path: '/user-management', icon: '👤' },
    { name: 'Mentor Management', path: '/mentor-approval', icon: '🧑‍🏫' },
    { name: 'Position Management', path: '/position-management', icon: '💼' },
    { name: 'Booking Management', path: '/booking-management', icon: '📅' },
    { name: 'Invoice Management', path: '/invoice-management', icon: '🧾' },
    { name: 'Certificate Management', path: '/certificate-management', icon: '📜' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo">CAREERSYNC</div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path} 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                data-title={item.name}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;