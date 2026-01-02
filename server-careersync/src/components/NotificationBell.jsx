import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
// ✅ FIX: Corrected the CSS filename
import '../assets/css/components/notificationell.css'; 

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Calculate unread count safely
  const unreadCount = Array.isArray(notifications) 
    ? notifications.filter(n => !n.is_read).length 
    : 0;

  // 1. Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications'); 
      // Ensure we set an array to avoid errors
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Notification fetch error (backend not ready):", err.message);
    }
  };

  // 2. Poll for updates every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // 3. Mark as Read
  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      // Optimistic update
      setNotifications(prev => prev.map(n => n.id === id ? {...n, is_read: true} : n));
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  return (
    <div className="notification-wrapper" style={{ position: 'relative', marginRight: '15px' }}>
      <div 
        className="bell-icon" 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ cursor: 'pointer', position: 'relative', fontSize: '1.5rem' }}
      >
        🔔
        {unreadCount > 0 && (
          <span className="badge-count">
            {unreadCount}
          </span>
        )}
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <span>Notifications</span>
            <button onClick={() => setShowDropdown(false)}>✕</button>
          </div>
          
          <div className="dropdown-body">
            {notifications.length === 0 ? (
              <p className="no-noti">No notifications</p>
            ) : (
              notifications.map(noti => (
                <div 
                  key={noti.id} 
                  className={`noti-item ${noti.is_read ? 'read' : 'unread'}`}
                  onClick={() => handleMarkRead(noti.id)}
                >
                  <div className="noti-title">{noti.title}</div>
                  <div className="noti-msg">{noti.message}</div>
                  <div className="noti-time">
                    {new Date(noti.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;