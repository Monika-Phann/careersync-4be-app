import React from 'react'
import {
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
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
} from '@mui/material'
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { BookingTableStyles } from './BookingTable.styles'

const statusColors = {
  Completed: { color: '#4caf50', bgColor: '#e8f5e9' },
  Incomplete: { color: '#ff9800', bgColor: '#fff3e0' },
  Canceled: { color: '#f44336', bgColor: '#ffebee' },
  Accepted: { color: '#155DFC', bgColor: '#E8F0FF' },
  Rejected: { color: '#D32F2F', bgColor: '#FFEBEE' },
  Pending: { color: '#155DFC', bgColor: '#E3F2FD' },
}

const splitDateTime = (dateTime) => {
  if (!dateTime) return { date: '', time: '' }
  const parts = String(dateTime).split(',')
  return {
    date: parts[0]?.trim() || String(dateTime),
    time: parts.slice(1).join(',').trim(),
  }
}

function BookingTable({
  title = 'All Bookings',
  bookings,
  showActions = false,
  showAcceptReject = false,
  onView,
  onAccept,
  onReject,
  onExport,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedBooking, setSelectedBooking] = React.useState(null)

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const getAvatarColor = (initials) => {
    const colors = ['#1976d2', '#42a5f5', '#666666', '#9c27b0', '#757575']
    const index = initials.charCodeAt(0) % colors.length
    return colors[index]
  }

  const handleMenuOpen = (event, booking) => {
    setAnchorEl(event.currentTarget)
    setSelectedBooking(booking)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedBooking(null)
  }

  const handleView = (booking) => {
    handleMenuClose()
    if (onView) onView(booking)
  }

  return (
    <Card sx={BookingTableStyles.card}>
      <CardContent sx={BookingTableStyles.content}>
        <Box sx={BookingTableStyles.header}>
          <Typography variant="h6" sx={BookingTableStyles.title}>
            {title}
          </Typography>
          {onExport && (
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={onExport}
              sx={BookingTableStyles.exportButton}
            >
              Export
            </Button>
          )}
        </Box>

        <Box sx={BookingTableStyles.toolbar}>
          <TextField
            placeholder="Search bookings..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={BookingTableStyles.searchIcon} />
                </InputAdornment>
              ),
            }}
            sx={BookingTableStyles.searchField}
          />
          <Box sx={BookingTableStyles.filters}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={BookingTableStyles.filterButton}
            >
              Status: All
            </Button>
            <Button
              variant="outlined"
              startIcon={<CalendarIcon />}
              sx={BookingTableStyles.filterButton}
            >
              Date Range
            </Button>
          </Box>
        </Box>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: { xs: 860, md: 'auto' } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={BookingTableStyles.headerCell}>Booking ID</TableCell>
                <TableCell sx={BookingTableStyles.headerCell}>User</TableCell>
                <TableCell sx={BookingTableStyles.headerCell}>Date & Time</TableCell>
                <TableCell sx={BookingTableStyles.headerCell}>Duration</TableCell>
                <TableCell sx={BookingTableStyles.headerCell}>Amount</TableCell>
                {showAcceptReject ? (
                  <>
                    <TableCell sx={BookingTableStyles.headerCell}>Approval</TableCell>
                    <TableCell sx={BookingTableStyles.headerCell}>Action</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell sx={BookingTableStyles.headerCell}>Status</TableCell>
                    <TableCell sx={BookingTableStyles.headerCell}>Actions</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} sx={BookingTableStyles.tableRow}>
                  <TableCell>
                    <Typography variant="body2" sx={BookingTableStyles.bookingId}>
                      {booking.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={BookingTableStyles.userCell}>
                      <Avatar
                        sx={{
                          ...BookingTableStyles.avatar,
                          backgroundColor: getAvatarColor(getInitials(booking.user.name)),
                        }}
                      >
                        {getInitials(booking.user.name)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={BookingTableStyles.userName}>
                          {booking.user.name}
                        </Typography>
                        <Typography variant="caption" sx={BookingTableStyles.userEmail}>
                          {booking.user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const { date, time } = splitDateTime(booking.dateTime)
                      return (
                        <Box sx={BookingTableStyles.dateTimeCell}>
                          <Typography variant="body2" sx={BookingTableStyles.dateText}>
                            {date}
                          </Typography>
                          {time ? (
                            <Typography variant="caption" sx={BookingTableStyles.timeText}>
                              {time}
                            </Typography>
                          ) : null}
                        </Box>
                      )
                    })()}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{booking.duration}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={BookingTableStyles.amount}>
                      ${booking.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {showAcceptReject ? (
                      <Box sx={BookingTableStyles.approvalCell}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => onAccept && onAccept(booking)}
                          sx={BookingTableStyles.acceptButton}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => onReject && onReject(booking)}
                          sx={BookingTableStyles.rejectButton}
                        >
                          Reject
                        </Button>
                      </Box>
                    ) : (
                      <Chip
                        label={booking.status}
                        size="small"
                        sx={{
                          ...BookingTableStyles.statusChip,
                          color: statusColors[booking.status]?.color || '#666',
                          backgroundColor:
                            statusColors[booking.status]?.bgColor || '#f5f5f5',
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={BookingTableStyles.actionsCell}>
                      {(showActions || showAcceptReject) && (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleView(booking)}
                            sx={BookingTableStyles.viewButton}
                          >
                            View
                          </Button>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, booking)}
                            sx={BookingTableStyles.moreButton}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </>
                      )}
                      {!showActions && !showAcceptReject && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleView(booking)}
                          sx={BookingTableStyles.viewButton}
                        >
                          View
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={BookingTableStyles.pagination}>
          <Typography variant="body2" sx={BookingTableStyles.paginationText}>
            Showing {bookings.length} of {totalItems} bookings
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => onPageChange && onPageChange(page)}
            color="primary"
            shape="rounded"
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleView(selectedBooking)}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default BookingTable

