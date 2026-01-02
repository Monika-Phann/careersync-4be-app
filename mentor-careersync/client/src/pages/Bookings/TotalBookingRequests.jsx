import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Alert } from '@mui/material'
import BookingSummaryCards from '../../components/UI/BookingSummaryCards/BookingSummaryCards'
import BookingTable from '../../components/UI/BookingTable/BookingTable'
import BookingDetailsModal from '../../components/Modals/BookingDetailsModal'
import UserDetailsModal from '../../components/Modals/UserDetailsModal'
import BookingConfirmationModal from '../../components/Modals/BookingConfirmationModal'
import { TotalBookingRequestsStyles } from './TotalBookingRequests.styles'
import { getPendingBookings, getMyBookings, acceptBooking, rejectBooking, formatBookingForDisplay } from '../../services/bookingApi'

function TotalBookingRequests() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [userDetailsModalOpen, setUserDetailsModalOpen] = useState(false)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [confirmationType, setConfirmationType] = useState('accepted')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [bookingRequests, setBookingRequests] = useState([])
  const [allBookings, setAllBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Fetch booking data
  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [pendingData, allData] = await Promise.all([
        getPendingBookings(),
        getMyBookings()
      ])

      const formattedPending = pendingData.map(formatBookingForDisplay)
      const formattedAll = allData.map(formatBookingForDisplay)

      setBookingRequests(formattedPending)
      setAllBookings(formattedAll)
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError(err.response?.data?.message || 'Failed to load bookings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Calculate stats from real data
  const requestStats = [
    { 
      label: 'Total Booking Requests', 
      value: bookingRequests.length, 
      color: '#1976d2' 
    },
    { 
      label: 'Accepted', 
      value: allBookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').length, 
      color: '#4caf50' 
    },
    { 
      label: 'Rejected', 
      value: allBookings.filter(b => b.status === 'Cancelled').length, 
      color: '#f44336' 
    },
  ]

  const handleView = (booking) => {
    // For booking requests, show user details
    setSelectedUser(booking.user)
    setUserDetailsModalOpen(true)
  }

  const handleAccept = async (booking) => {
    setActionLoading(true)
    try {
      await acceptBooking(booking.bookingId || booking.id)
      setConfirmationType('accepted')
      setConfirmationModalOpen(true)
      // Refresh bookings after successful action
      await fetchBookings()
    } catch (err) {
      console.error('Error accepting booking:', err)
      setError(err.response?.data?.message || 'Failed to accept booking. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (booking) => {
    setActionLoading(true)
    try {
      await rejectBooking(booking.bookingId || booking.id, 'Mentor rejected the booking')
      setConfirmationType('rejected')
      setConfirmationModalOpen(true)
      // Refresh bookings after successful action
      await fetchBookings()
    } catch (err) {
      console.error('Error rejecting booking:', err)
      setError(err.response?.data?.message || 'Failed to reject booking. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleUserAccept = async (user) => {
    // Handle user accept logic - find the booking by user
    const booking = bookingRequests.find(b => b.user.userId === user.userId)
    if (booking) {
      await handleAccept(booking)
    }
  }

  const handleUserReject = async (user) => {
    // Handle user reject logic - find the booking by user
    const booking = bookingRequests.find(b => b.user.userId === user.userId)
    if (booking) {
      await handleReject(booking)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={TotalBookingRequestsStyles.container}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <BookingSummaryCards stats={requestStats} />

      {bookingRequests.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          color: 'text.secondary',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ fontSize: '3rem', mb: 2 }}>📭</Box>
          <Box sx={{ fontSize: '1.25rem', fontWeight: 500 }}>No pending booking requests</Box>
          <Box sx={{ fontSize: '0.875rem', mt: 1 }}>When students book your sessions, they will appear here</Box>
        </Box>
      ) : (
        <BookingTable
          title="All Booking Requests"
          bookings={bookingRequests}
          showAcceptReject={true}
          showActions={true}
          onView={handleView}
          onAccept={handleAccept}
          onReject={handleReject}
          currentPage={1}
          totalPages={1}
          totalItems={bookingRequests.length}
          loading={actionLoading}
        />
      )}

      <BookingDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        booking={selectedBooking}
      />

      <UserDetailsModal
        open={userDetailsModalOpen}
        onClose={() => setUserDetailsModalOpen(false)}
        user={selectedUser}
        onAccept={handleUserAccept}
        onReject={handleUserReject}
      />

      <BookingConfirmationModal
        open={confirmationModalOpen}
        onClose={() => {
          setConfirmationModalOpen(false)
          // Optionally refresh bookings when modal closes
        }}
        type={confirmationType}
      />
    </Box>
  )
}

export default TotalBookingRequests

