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
  Pagination,
} from '@mui/material'
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import BookingSummaryCards from '../../components/UI/BookingSummaryCards/BookingSummaryCards'
import InvoiceDetailsModal from '../../components/Modals/InvoiceDetailsModal'
import { TotalInvoiceStyles } from './TotalInvoice.styles'
import { getMyInvoices } from '../../services/bookingApi'
import { CircularProgress, Alert } from '@mui/material'

const statusColors = {
  Paid: { color: '#008236', bgColor: '#E8F5E9', border: '#C8E6C9' },
  Pending: { color: '#CA3500', bgColor: '#FFF3E0', border: '#FFD7A8' },
  Canceled: { color: '#B71C1C', bgColor: '#FFEBEE', border: '#FFCDD2' },
}

const splitDateTime = (dateTime) => {
  if (!dateTime) return { date: '', time: '' }
  const parts = String(dateTime).split(',')
  return {
    date: parts[0]?.trim() || String(dateTime),
    time: parts.slice(1).join(',').trim(),
  }
}

function TotalInvoice() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMyInvoices()
        
        // Format invoices for display
        const formattedInvoices = data.map((invoice) => {
          const student = invoice.AccUser
          const payment = invoice.Payment
          
          // Format date/time from start_date_snapshot
          const sessionDate = invoice.start_date_snapshot 
            ? new Date(invoice.start_date_snapshot)
            : new Date(invoice.created_at)
          
          const dateStr = sessionDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
          const timeStr = sessionDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
          
          // Get booking ID from Payment
          const bookingId = payment?.booking_id 
            ? `BK-${payment.booking_id.substring(0, 8).toUpperCase()}`
            : `INV-${invoice.id.substring(0, 8).toUpperCase()}`
          
          // All invoices show as Paid status
          let status = 'Paid'
          
          return {
            id: invoice.id,
            invoiceId: `INV-${invoice.id.substring(0, 6).toUpperCase()}`,
            user: {
              name: student 
                ? `${student.first_name || ''} ${student.last_name || ''}`.trim() 
                : invoice.acc_user_name_snapshot || 'Student',
              email: student?.User?.email || '',
              initials: student 
                ? `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase()
                : (invoice.acc_user_name_snapshot || 'S').substring(0, 2).toUpperCase()
            },
            bookingId: bookingId,
            dateTime: `${dateStr}, ${timeStr}`,
            amount: parseFloat(invoice.total_amount || 0),
            status: status,
            rawInvoice: invoice
          }
        })
        
        setInvoices(formattedInvoices)
      } catch (err) {
        console.error('Error fetching invoices:', err)
        setError(err.response?.data?.message || err.message || 'Failed to load invoices')
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  // Calculate stats - all invoices are paid
  const stats = [
    { label: 'Total Invoices', value: invoices.length, color: '#1976d2' },
    { label: 'Paid', value: invoices.length, color: '#4caf50' },
    { label: 'Pending', value: 0, color: '#ff9800' },
  ]

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(invoice =>
    invoice.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage)

  const handleMenuOpen = (event, invoice) => {
    setAnchorEl(event.currentTarget)
    setSelectedInvoice(invoice)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleView = (invoice) => {
    setSelectedInvoice(invoice)
    setDetailsOpen(true)
    handleMenuClose()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={TotalInvoiceStyles.container}>
      <BookingSummaryCards stats={stats} />

      <Card sx={TotalInvoiceStyles.card}>
        <CardContent sx={TotalInvoiceStyles.content}>
          <Box sx={TotalInvoiceStyles.header}>
            <Typography variant="h6" sx={TotalInvoiceStyles.title}>
              All Invoices
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={TotalInvoiceStyles.downloadAllButton}
            >
              Download All
            </Button>
          </Box>

          <Box sx={TotalInvoiceStyles.toolbar}>
            <TextField
              placeholder="Search users..."
              size="small"
              sx={TotalInvoiceStyles.searchField}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={TotalInvoiceStyles.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={TotalInvoiceStyles.filters}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={TotalInvoiceStyles.filterButton}
              >
                Status: All
              </Button>
              <Button
                variant="outlined"
                startIcon={<CalendarIcon />}
                sx={TotalInvoiceStyles.filterButton}
              >
                Date Range
              </Button>
            </Box>
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 780, md: 'auto' } }}>
              <TableHead>
                <TableRow sx={TotalInvoiceStyles.headerRow}>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>
                    Invoice ID
                  </TableCell>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>User</TableCell>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>
                    Booking ID
                  </TableCell>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>
                    Date & Time
                  </TableCell>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>Amount</TableCell>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>Status</TableCell>
                  <TableCell sx={TotalInvoiceStyles.headerCell}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.invoiceId} sx={TotalInvoiceStyles.tableRow}>
                    <TableCell>
                      <Typography sx={TotalInvoiceStyles.invoiceId}>
                        {invoice.invoiceId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={TotalInvoiceStyles.userCell}>
                        <Avatar sx={TotalInvoiceStyles.avatar}>
                          {invoice.user.initials}
                        </Avatar>
                        <Box>
                          <Typography sx={TotalInvoiceStyles.userName}>
                            {invoice.user.name}
                          </Typography>
                          <Typography sx={TotalInvoiceStyles.userEmail}>
                            {invoice.user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={TotalInvoiceStyles.bookingId}>
                        {invoice.bookingId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const { date, time } = splitDateTime(invoice.dateTime)
                        return (
                          <Box sx={TotalInvoiceStyles.dateTimeCell}>
                            <Typography sx={TotalInvoiceStyles.dateText}>{date}</Typography>
                            <Typography sx={TotalInvoiceStyles.timeText}>{time}</Typography>
                          </Box>
                        )
                      })()}
                    </TableCell>
                    <TableCell>
                      <Typography sx={TotalInvoiceStyles.amount}>
                        ${invoice.amount % 1 === 0 ? invoice.amount : invoice.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        size="small"
                        sx={{
                          ...TotalInvoiceStyles.statusChip,
                          color: statusColors[invoice.status]?.color || '#666666',
                          backgroundColor: statusColors[invoice.status]?.bgColor || '#F5F5F5',
                          border: `1px solid ${statusColors[invoice.status]?.border || '#E0E0E0'}`,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={TotalInvoiceStyles.actionsCell}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleView(invoice)}
                          sx={TotalInvoiceStyles.viewButton}
                        >
                          View
                        </Button>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, invoice)}
                          sx={TotalInvoiceStyles.moreButton}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {searchQuery ? 'No invoices found matching your search' : 'No invoices available'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={TotalInvoiceStyles.pagination}>
            <Typography variant="body2" sx={TotalInvoiceStyles.paginationText}>
              Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              shape="rounded"
            />
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'invoice-actions-menu',
        }}
      >
        <MenuItem onClick={() => handleView(selectedInvoice)}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Download PDF</MenuItem>
        <MenuItem onClick={handleMenuClose}>Send Email</MenuItem>
      </Menu>

      <InvoiceDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        invoice={selectedInvoice}
      />
    </Box>
  )
}

export default TotalInvoice