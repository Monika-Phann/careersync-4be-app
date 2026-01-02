// src/pages/BookingManagement.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/components/bookingmanagement.css';

const BookingManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on active tab
  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'pending':
        return bookings.filter(b => b.status === 'Pending');
      case 'ongoing':
        return bookings.filter(b => b.status === 'Accepted');
      case 'history':
        return bookings.filter(b => 
          ['Completed', 'Cancelled', 'Rejected', 'Incomplete'].includes(b.status)
        );
      default:
        return bookings;
    }
  };

  const filteredBookings = getFilteredBookings();

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Reset to page 1 when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-pending';
      case 'Accepted':
        return 'badge-accepted';
      case 'Completed':
        return 'badge-completed';
      case 'Cancelled':
        return 'badge-cancelled';
      case 'Rejected':
        return 'badge-rejected';
      case 'Incomplete':
        return 'badge-incomplete';
      default:
        return 'badge-secondary';
    }
  };

  // Handle view booking details
  const handleViewDetails = (booking) => {
    // Navigate to booking details page or open modal
    console.log('View booking:', booking);
    alert(`View details for booking: ${booking.booking_id}`);
  };

  // Get count for each tab
  const getPendingCount = () => bookings.filter(b => b.status === 'Pending').length;
  const getOngoingCount = () => bookings.filter(b => b.status === 'Accepted').length;
  const getHistoryCount = () => bookings.filter(b => 
    ['Completed', 'Cancelled', 'Rejected', 'Incomplete'].includes(b.status)
  ).length;

  return (
    <div className="booking-management-container">
      <div className="page-header">
        <h2>Booking Management</h2>
        <p className="text-muted">Manage and track all booking sessions</p>
      </div>

      {/* Tabs */}
      <div className="booking-tabs">
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({getPendingCount()})
        </button>
        <button
          className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing ({getOngoingCount()})
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History ({getHistoryCount()})
        </button>
      </div>

      {/* Bookings Table */}
      <div className="card booking-card">
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table booking-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User Name</th>
                    <th>Mentor Name</th>
                    <th>Position</th>
                    {activeTab !== 'pending' && <th>Start Date</th>}
                    {activeTab !== 'pending' && <th>Start Time</th>}
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="fw-semibold">{booking.booking_id}</td>
                        <td>{booking.user_name}</td>
                        <td>{booking.mentor_name}</td>
                        <td>{booking.position}</td>
                        {activeTab !== 'pending' && (
                          <td>{booking.start_date || 'N/A'}</td>
                        )}
                        {activeTab !== 'pending' && (
                          <td>{booking.start_time || 'N/A'}</td>
                        )}
                        <td>
                          <span className={`status-badge ${getStatusClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-view"
                            onClick={() => handleViewDetails(booking)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td 
                        colSpan={activeTab === 'pending' ? '6' : '8'} 
                        className="text-center py-5 text-muted"
                      >
                        No bookings found in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredBookings.length > 0 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} bookings
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={prevPage}>
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li 
                        key={i + 1} 
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={nextPage}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;