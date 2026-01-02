import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
} from '@mui/material'
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material'
import { InvoiceDetailsModalStyles } from './InvoiceDetailsModal.styles'

function InvoiceDetailsModal({ open, onClose, invoice }) {
  if (!invoice) return null

  const items = [
    {
      description: 'Data Analyst',
      qty: 1,
      rate: invoice.amount % 1 === 0 ? `$${invoice.amount}` : `$${invoice.amount.toFixed(2)}`,
      amount: invoice.amount,
    },
  ]

  const subtotal = invoice.amount

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: InvoiceDetailsModalStyles.dialogPaper }}
    >
      <DialogTitle sx={InvoiceDetailsModalStyles.dialogTitle}>
        <Box>
          <Typography sx={InvoiceDetailsModalStyles.title}>Invoice Details</Typography>
          <Box sx={InvoiceDetailsModalStyles.subtitleRow}>
            <Typography sx={InvoiceDetailsModalStyles.subtitleLabel}>Invoice ID:</Typography>
            <Typography sx={InvoiceDetailsModalStyles.subtitleValue}>
              {invoice.invoiceId}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={InvoiceDetailsModalStyles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={InvoiceDetailsModalStyles.dialogContent}>
        <Box sx={InvoiceDetailsModalStyles.topInfoGrid}>
          <Box>
            <Typography sx={InvoiceDetailsModalStyles.sectionTitle}>Invoice Information</Typography>
            <Box sx={InvoiceDetailsModalStyles.infoList}>
              <Box sx={InvoiceDetailsModalStyles.infoRow}>
                <Typography sx={InvoiceDetailsModalStyles.infoLabel}>Booking Number</Typography>
                <Typography sx={InvoiceDetailsModalStyles.infoValue}>{invoice.bookingId}</Typography>
              </Box>
              <Box sx={InvoiceDetailsModalStyles.infoRow}>
                <Typography sx={InvoiceDetailsModalStyles.infoLabel}>Booking Date</Typography>
                <Typography sx={InvoiceDetailsModalStyles.infoValue}>11-09-2025</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography sx={InvoiceDetailsModalStyles.sectionTitle}>Student Information</Typography>
            <Box sx={InvoiceDetailsModalStyles.infoList}>
              <Box sx={InvoiceDetailsModalStyles.infoRow}>
                <Typography sx={InvoiceDetailsModalStyles.infoLabel}>Student Name</Typography>
                <Typography sx={InvoiceDetailsModalStyles.infoValue}>{invoice.user.name}</Typography>
              </Box>
              <Box sx={InvoiceDetailsModalStyles.infoRow}>
                <Typography sx={InvoiceDetailsModalStyles.infoLabel}>Student ID</Typography>
                <Typography sx={InvoiceDetailsModalStyles.infoValue}>U005</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={InvoiceDetailsModalStyles.programSection}>
          <Typography sx={InvoiceDetailsModalStyles.sectionTitle}>Program Details</Typography>
          <Box sx={InvoiceDetailsModalStyles.programCard}>
            <Box sx={InvoiceDetailsModalStyles.programGrid}>
              <Box sx={InvoiceDetailsModalStyles.programItem}>
                <Typography sx={InvoiceDetailsModalStyles.programLabel}>Program Name</Typography>
                <Typography sx={InvoiceDetailsModalStyles.programValue}>Data Analyst</Typography>
              </Box>
              <Box sx={InvoiceDetailsModalStyles.programItem}>
                <Typography sx={InvoiceDetailsModalStyles.programLabel}>Mentor Name</Typography>
                <Typography sx={InvoiceDetailsModalStyles.programValue}>Marcus Johnson</Typography>
              </Box>
              <Box sx={InvoiceDetailsModalStyles.programItem}>
                <Typography sx={InvoiceDetailsModalStyles.programLabel}>Start Date</Typography>
                <Typography sx={InvoiceDetailsModalStyles.programValue}>16 Nov 2025</Typography>
              </Box>
              <Box sx={InvoiceDetailsModalStyles.programItem}>
                <Typography sx={InvoiceDetailsModalStyles.programLabel}>End Date</Typography>
                <Typography sx={InvoiceDetailsModalStyles.programValue}>16 Nov 2025</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={InvoiceDetailsModalStyles.itemsSection}>
          <Typography sx={InvoiceDetailsModalStyles.sectionTitle}>Items</Typography>
          <TableContainer sx={InvoiceDetailsModalStyles.itemsCard}>
            <Table size="small">
              <TableHead sx={InvoiceDetailsModalStyles.itemsHeaderRow}>
                <TableRow>
                  <TableCell sx={InvoiceDetailsModalStyles.itemsHeaderCell}>Description</TableCell>
                  <TableCell sx={InvoiceDetailsModalStyles.itemsHeaderCell} align="right">
                    Qty
                  </TableCell>
                  <TableCell sx={InvoiceDetailsModalStyles.itemsHeaderCell} align="right">
                    Rate
                  </TableCell>
                  <TableCell sx={InvoiceDetailsModalStyles.itemsHeaderCell} align="right">
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={InvoiceDetailsModalStyles.itemsCell}>
                      {item.description}
                    </TableCell>
                    <TableCell sx={InvoiceDetailsModalStyles.itemsCell} align="right">
                      {item.qty}
                    </TableCell>
                    <TableCell sx={InvoiceDetailsModalStyles.itemsCell} align="right">
                      {item.rate}
                    </TableCell>
                    <TableCell sx={InvoiceDetailsModalStyles.itemsCell} align="right">
                      ${item.amount % 1 === 0 ? item.amount : item.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={InvoiceDetailsModalStyles.totals}>
            <Box sx={InvoiceDetailsModalStyles.totalRow}>
              <Typography sx={InvoiceDetailsModalStyles.totalLabel}>Subtotal</Typography>
              <Typography sx={InvoiceDetailsModalStyles.infoValue}>
                ${subtotal % 1 === 0 ? subtotal : subtotal.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ ...InvoiceDetailsModalStyles.totalRow, borderBottom: 'none' }}>
              <Typography sx={InvoiceDetailsModalStyles.totalAmountLabel}>Total Amount</Typography>
              <Typography sx={InvoiceDetailsModalStyles.totalAmountValue}>
                ${subtotal % 1 === 0 ? subtotal : subtotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={InvoiceDetailsModalStyles.dialogActions}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={InvoiceDetailsModalStyles.downloadButton}
          onClick={() => console.log('Download invoice', invoice.invoiceId)}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InvoiceDetailsModal


