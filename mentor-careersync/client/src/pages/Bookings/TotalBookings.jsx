import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Alert } from '@mui/material'
import BookingSummaryCards from '../../components/UI/BookingSummaryCards/BookingSummaryCards'
import BookingTable from '../../components/UI/BookingTable/BookingTable'
import BookingDetailsModal from '../../components/Modals/BookingDetailsModal'
import { TotalBookingsStyles } from './TotalBookings.styles'
import { getMyBookings, formatBookingForDisplay } from '../../services/bookingApi'

function TotalBookings() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await getMyBookings()
      const formattedBookings = data.map(formatBookingForDisplay)
      
      setBookings(formattedBookings)
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
  const stats = [
    { 
      label: 'Total Bookings', 
      value: bookings.length, 
      color: '#1976d2' 
    },
    { 
      label: 'Accepted', 
      value: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').length, 
      color: '#4caf50' 
    },
    { 
      label: 'Rejected', 
      value: bookings.filter(b => b.status === 'Cancelled').length, 
      color: '#f44336' 
    },
  ]

  const handleView = (booking) => {
    setSelectedBooking(booking)
    setDetailsModalOpen(true)
  }

  const handleExport = () => {
    // Handle export logic
    console.log('Exporting bookings...')
    // TODO: Implement CSV export functionality
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={TotalBookingsStyles.container}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <BookingSummaryCards stats={stats} />

      {bookings.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          color: 'text.secondary',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ fontSize: '3rem', mb: 2 }}>📋</Box>
          <Box sx={{ fontSize: '1.25rem', fontWeight: 500 }}>No bookings yet</Box>
          <Box sx={{ fontSize: '0.875rem', mt: 1 }}>Your booking history will appear here once students book your sessions</Box>
        </Box>
      ) : (
        <BookingTable
          title="All Bookings"
          bookings={bookings}
          showActions={true}
          onView={handleView}
          onExport={handleExport}
          currentPage={1}
          totalPages={1}
          totalItems={bookings.length}
        />
      )}

      <BookingDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        booking={selectedBooking}
      />
    </Box>
  )
}

export default TotalBookings

