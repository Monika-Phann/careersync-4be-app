import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import BookingSummaryCards from '../../components/UI/BookingSummaryCards/BookingSummaryCards'
import UserDetailsModal from '../../components/Modals/UserDetailsModal'
import { UserManagementStyles } from './user_management.styles'
import { getMyBookings, formatBookingForDisplay, completeBooking, rejectBooking } from '../../services/bookingApi'

const statusColors = {
  Completed: { color: '#008236', bgColor: '#E8F5E9', border: '#C8E6C9' },
  Accepted: { color: '#1447E6', bgColor: '#E8F0FF', border: '#C6D4FF' },
  Incompleted: { color: '#CA3500', bgColor: '#FFF3E0', border: '#FFD7A8' },
}

const statusMenuColors = {
  Accepted: '#1447E6',
  Completed: '#008236',
  Incompleted: '#CA3500',
}

const splitDateTime = (dateTime) => {
  if (!dateTime) return { date: '', time: '' }
  const parts = String(dateTime).split(',')
  return {
    date: parts[0]?.trim() || String(dateTime),
    time: parts.slice(1).join(',').trim(),
  }
}

function UserManagement() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetailsOpen, setUserDetailsOpen] = useState(false)
  const [viewUser, setViewUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  // Helper function to format and filter bookings
  const formatAndFilterBookings = (bookingsData) => {
    const acceptedBookings = bookingsData.filter((booking) => {
      return booking.status === 'confirmed' || booking.status === 'completed'
    })
    
    return acceptedBookings.map((booking) => {
      const formatted = formatBookingForDisplay(booking)
      if (!formatted) return null

      let uiStatus = formatted.status
      if (booking.status === 'confirmed') {
        uiStatus = 'Accepted'
      } else if (booking.status === 'completed') {
        uiStatus = 'Completed'
      } else if (booking.status === 'cancelled' || booking.status === 'pending') {
        uiStatus = 'Incompleted'
      }

      const nameParts = formatted.user.name.split(' ')
      const initials = nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : nameParts[0]?.substring(0, 2).toUpperCase() || 'U'

      const userId = formatted.user.userId 
        ? `U${formatted.user.userId.substring(0, 4).toUpperCase()}`
        : `U${booking.id.toString().padStart(4, '0')}`

      return {
        userId,
        user: {
          name: formatted.user.name,
          email: formatted.user.email,
          initials,
        },
        bookingId: formatted.bookingId,
        dateTime: formatted.dateTime,
        amount: formatted.amount,
        status: uiStatus,
        rawBooking: booking,
        rawFormatted: formatted,
      }
    }).filter(Boolean)
  }

  const handleStatusChange = async (status) => {
    if (!selectedUser) {
      handleMenuClose()
      return
    }

    setActionLoading(true)
    try {
      const bookingId = selectedUser.rawBooking?.id || selectedUser.bookingId
      
      if (!bookingId) {
        setError('Booking ID not found')
        handleMenuClose()
        setActionLoading(false)
        return
      }

      if (status === 'Completed') {
        // Mark booking as completed and generate certificate
        await completeBooking(bookingId)
      } else if (status === 'Incompleted') {
        // Mark booking as cancelled (incompleted) - no certificate generated
        await rejectBooking(bookingId, 'Marked as incomplete by mentor')
      }
      
      // Refresh bookings list
      const bookingsData = await getMyBookings()
      const formattedBookings = formatAndFilterBookings(bookingsData)
      setBookings(formattedBookings)
      setFilteredBookings(formattedBookings)
      
      handleMenuClose()
    } catch (err) {
      console.error('Error updating booking status:', err)
      setError(err.response?.data?.message || err.message || 'Failed to update booking status')
      handleMenuClose()
    } finally {
      setActionLoading(false)
    }
  }

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError(null)
        const bookingsData = await getMyBookings()
        const formattedBookings = formatAndFilterBookings(bookingsData)
        setBookings(formattedBookings)
        setFilteredBookings(formattedBookings)
      } catch (err) {
        console.error('Error fetching bookings:', err)
        setError(err.message || 'Failed to load bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Filter bookings based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBookings(bookings)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = bookings.filter((booking) => {
      return (
        booking.user.name.toLowerCase().includes(query) ||
        booking.user.email.toLowerCase().includes(query) ||
        booking.bookingId.toString().toLowerCase().includes(query)
      )
    })
    setFilteredBookings(filtered)
  }, [searchQuery, bookings])

  // Calculate stats from bookings
  const stats = React.useMemo(() => {
    const totalUsers = new Set(bookings.map(b => b.user.email)).size
    const completed = bookings.filter(b => b.status === 'Completed').length
    const incomplete = bookings.filter(b => b.status === 'Incompleted').length

    return [
      { label: 'Total Users', value: totalUsers, color: '#1976d2' },
      { label: 'Completed', value: completed, color: '#4caf50' },
      { label: 'Incompleted', value: incomplete, color: '#ff9800' },
    ]
  }, [bookings])

  const handleView = (userRow) => {
    const formatted = userRow.rawFormatted
    if (!formatted) return

    const [firstName, ...rest] = (formatted.user.name || '').split(' ')
    const lastName = rest.join(' ')
    
    setViewUser({
      userId: userRow.userId,
      name: formatted.user.name,
      email: formatted.user.email,
      firstName,
      lastName,
      phone: formatted.user.phone || 'N/A',
      gender: formatted.user.gender || 'N/A',
      dateOfBirth: formatted.user.dateOfBirth || 'N/A',
      role: formatted.user.role || 'Student',
      status: formatted.user.status || 'Student',
      institution: formatted.user.institution || 'N/A',
      topRightStatus: userRow.status,
    })
    setUserDetailsOpen(true)
  }

  return (
    <Box sx={UserManagementStyles.container}>
      <BookingSummaryCards stats={stats} />

      <Card sx={UserManagementStyles.card}>
        <CardContent sx={UserManagementStyles.content}>
          <Box sx={UserManagementStyles.header}>
            <Typography variant="h6" sx={UserManagementStyles.title}>
              All Users
            </Typography>
          </Box>

          <Box sx={UserManagementStyles.toolbar}>
            <TextField
              placeholder="Search users..."
              size="small"
              sx={UserManagementStyles.searchField}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={UserManagementStyles.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={UserManagementStyles.filters}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={UserManagementStyles.filterButton}
              >
                Status: All
              </Button>
              <Button
                variant="outlined"
                startIcon={<CalendarIcon />}
                sx={UserManagementStyles.filterButton}
              >
                Date Range
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 720, md: 'auto' } }}>
                <TableHead>
                  <TableRow sx={UserManagementStyles.headerRow}>
                    <TableCell sx={UserManagementStyles.headerCell}>User ID</TableCell>
                    <TableCell sx={UserManagementStyles.headerCell}>User</TableCell>
                    <TableCell sx={UserManagementStyles.headerCell}>Date & Time</TableCell>
                    <TableCell sx={UserManagementStyles.headerCell}>Mark</TableCell>
                    <TableCell sx={UserManagementStyles.headerCell}>Status</TableCell>
                    <TableCell sx={UserManagementStyles.headerCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          {searchQuery ? 'No bookings found matching your search.' : 'No bookings found.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((user, index) => (
                  <TableRow key={user.bookingId || `booking-${index}`} sx={UserManagementStyles.tableRow}>
                    <TableCell>
                      <Typography sx={UserManagementStyles.userId}>
                        {user.userId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={UserManagementStyles.userCell}>
                        <Avatar sx={UserManagementStyles.avatar}>
                          {user.user.initials}
                        </Avatar>
                        <Box>
                          <Typography sx={UserManagementStyles.userName}>
                            {user.user.name}
                          </Typography>
                          <Typography sx={UserManagementStyles.userEmail}>
                            {user.user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const { date, time } = splitDateTime(user.dateTime)
                        return (
                          <Box sx={UserManagementStyles.dateTimeCell}>
                            <Typography sx={UserManagementStyles.dateText}>{date}</Typography>
                            <Typography sx={UserManagementStyles.timeText}>{time}</Typography>
                          </Box>
                        )
                      })()}
                    </TableCell>
                    <TableCell sx={UserManagementStyles.markCell}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, user)}
                        sx={UserManagementStyles.moreButton}
                        disabled={actionLoading}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          ...UserManagementStyles.statusChip,
                          color: statusColors[user.status]?.color || '#666666',
                          backgroundColor: statusColors[user.status]?.bgColor || '#F5F5F5',
                          border: `1px solid ${statusColors[user.status]?.border || '#E0E0E0'}`,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={UserManagementStyles.viewButton}
                        onClick={() => handleView(user)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'user-actions-menu',
        }}
      >
        {(['Completed', 'Incompleted']).map((status) => (
          <MenuItem
            key={status}
            onClick={() => handleStatusChange(status)}
            sx={{
              color: statusMenuColors[status],
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>

      <UserDetailsModal
        open={userDetailsOpen}
        onClose={() => {
          setUserDetailsOpen(false)
          setViewUser(null)
        }}
        user={viewUser}
        topRightStatus={viewUser?.topRightStatus}
      />
    </Box>
  )
}

export default UserManagement