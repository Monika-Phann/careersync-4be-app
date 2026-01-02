import {
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Button,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function InvoiceModal({ open, onClose, booking }) {
  if (!booking) return null;

  // Format dates for display (DD MMM YYYY format like "16 Nov 2025")
  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Format dates with time for session dates
  const formatDateTimeDisplay = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return dateString;
    }
  };

  // Calculate session duration in hours and minutes
  const getSessionDuration = () => {
    const startTime = booking.ScheduleTimeslot?.start_time || booking.start_date_snapshot;
    const endTime = booking.ScheduleTimeslot?.end_time || booking.end_date_snapshot;
    
    if (!startTime || !endTime) return 'N/A';
    
    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffMs = end - start;
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      
      if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        return `${minutes}m`;
      }
    } catch {
      return 'N/A';
    }
  };

  // Format dates with time for booking date
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Extract data from booking object
  // Program Name: from position name snapshot or Position association
  const programName = booking.position_name_snapshot || 
    booking.Position?.position_name || 
    'N/A';
  
  // Mentor Name: from snapshot (captured at booking time) or from mentor association
  const mentorName = booking.mentor_name_snapshot || 
    (booking.mentorUser ? `${booking.mentorUser.first_name || ''} ${booking.mentorUser.last_name || ''}`.trim() : '') ||
    'N/A';
  
  // Start and End dates: from the ScheduleTimeslot (the session that the student booked)
  // Priority: ScheduleTimeslot times > snapshot dates > fallback to N/A
  const startDate = booking.ScheduleTimeslot?.start_time
    ? formatDateDisplay(booking.ScheduleTimeslot.start_time)
    : (booking.start_date_snapshot 
      ? formatDateDisplay(booking.start_date_snapshot) 
      : 'N/A');
      
  const endDate = booking.ScheduleTimeslot?.end_time
    ? formatDateDisplay(booking.ScheduleTimeslot.end_time)
    : (booking.end_date_snapshot 
      ? formatDateDisplay(booking.end_date_snapshot) 
      : 'N/A');

  // Start and End dates with time for detailed display
  const startDateTime = booking.ScheduleTimeslot?.start_time
    ? formatDateTimeDisplay(booking.ScheduleTimeslot.start_time)
    : (booking.start_date_snapshot 
      ? formatDateTimeDisplay(booking.start_date_snapshot) 
      : 'N/A');
      
  const endDateTime = booking.ScheduleTimeslot?.end_time
    ? formatDateTimeDisplay(booking.ScheduleTimeslot.end_time)
    : (booking.end_date_snapshot 
      ? formatDateTimeDisplay(booking.end_date_snapshot) 
      : 'N/A');
  
  const bookingId = booking.id ? `BK-${booking.id.substring(0, 8).toUpperCase()}` : 'N/A';
  const bookingDate = booking.created_at ? formatDateTime(booking.created_at) : 'N/A';
  const studentName = booking.acc_user_name_snapshot || 
    (booking.AccUser ? `${booking.AccUser.first_name || ''} ${booking.AccUser.last_name || ''}`.trim() : '') ||
    'N/A';
  // Ensure totalAmount is a number
  const totalAmount = booking.total_amount 
    ? (typeof booking.total_amount === 'number' ? booking.total_amount : parseFloat(booking.total_amount) || 0)
    : 0;
  
  // Helper function to safely format amount
  const formatAmount = (amount) => {
    const numAmount = typeof amount === 'number' ? amount : (parseFloat(amount) || 0);
    return numAmount.toFixed(2);
  };
  
  // Additional invoice details
  const sessionLocation = booking.Session?.location_name || 'N/A';
  const paymentStatus = booking.Payment?.status || booking.status || 'N/A';
  const paymentMethod = booking.Payment?.payment_method || booking.payment_method_snapshot || 'Cash';
  const bookingStatus = booking.status || 'N/A';
  const sessionDuration = getSessionDuration();
  
  // Format payment status for display
  const getPaymentStatusDisplay = (status) => {
    if (!status) return 'N/A';
    const statusLower = status.toLowerCase();
    if (statusLower === 'paid' || statusLower === 'completed') return 'Paid';
    if (statusLower === 'pending' || statusLower === 'confirmed') return 'Pending';
    if (statusLower === 'failed' || statusLower === 'cancelled') return 'Cancelled';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  // Format booking status for display
  const getBookingStatusDisplay = (status) => {
    if (!status) return 'N/A';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    if (!status) return 'default';
    const statusLower = status.toLowerCase();
    if (statusLower === 'paid' || statusLower === 'completed' || statusLower === 'confirmed') return 'success';
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'failed' || statusLower === 'cancelled') return 'error';
    return 'default';
  };

  // Generate and download invoice PDF
  const handleDownloadInvoice = () => {
    // Use dynamic import to ensure autoTable is properly loaded
    import('jspdf-autotable').then(({ default: autoTable }) => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Invoice Header
      doc.setFontSize(20);
      doc.text("INVOICE", 105, 20, { align: "center" });
      
      // Invoice Details
      doc.setFontSize(10);
      doc.text(`Invoice ID: ${bookingId}`, 20, 35);
      doc.text(`Booking Number: ${bookingId}`, 20, 42);
      doc.text(`Booking Date: ${bookingDate}`, 20, 49);
      
      // Student Information
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("Student Information", 20, 60);
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);
      doc.text(`Student Name: ${studentName}`, 20, 68);
      
      // Program Details
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("Program Details", 20, 78);
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);
      
      const programDetails = [
        ["Program Name", programName],
        ["Mentor Name", mentorName],
        ["Start Date & Time", startDateTime],
        ["End Date & Time", endDateTime],
        ["Duration", sessionDuration],
        ["Location", sessionLocation],
      ];
      
      autoTable(doc, {
        startY: 85,
        head: [],
        body: programDetails,
        theme: "plain",
        styles: { fontSize: 10 },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 60 },
          1: { cellWidth: "auto" },
        },
        margin: { left: 20, right: 20 },
      });
      
      // Items Table
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("Items", 20, finalY);
      
      const itemsData = [
        ["Description", "Qty", "Rate", "Amount"],
        [programName, "1", `$${formatAmount(totalAmount)}`, `$${formatAmount(totalAmount)}`],
      ];
      
      autoTable(doc, {
        startY: finalY + 5,
        head: [itemsData[0]],
        body: [itemsData[1]],
        theme: "striped",
        headStyles: { fillColor: [61, 61, 61], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 30, halign: "center" },
          2: { cellWidth: 30, halign: "right" },
          3: { cellWidth: 30, halign: "right" },
        },
        margin: { left: 20, right: 20 },
      });
      
      // Payment Information
      finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("Payment Information", 20, finalY);
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);
      finalY += 10;
      doc.text(`Payment Method: ${paymentMethod}`, 20, finalY);
      finalY += 7;
      doc.text(`Payment Status: ${getPaymentStatusDisplay(paymentStatus)}`, 20, finalY);
      
      // Summary
      finalY += 15;
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`Subtotal: $${formatAmount(totalAmount)}`, 140, finalY, { align: "right" });
      finalY += 10;
      doc.setFont(undefined, "bold");
      doc.setFontSize(12);
      doc.text(`Total Amount: $${formatAmount(totalAmount)}`, 140, finalY, { align: "right" });
      
      // Footer
      finalY = finalY + 20;
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.text("Thank you for your business!", 105, finalY, { align: "center" });
      
      // Save the PDF
      const fileName = `Invoice-${bookingId.replace(/\s/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    }).catch((error) => {
      console.error("Error generating PDF:", error);
      alert("Failed to generate invoice. Please try again.");
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ position: "relative", p: 4 }}>
        {/* Close */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, right: 12 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Invoice Details
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Typography fontSize={14} color="text.secondary">
            Booking ID: <strong>{bookingId}</strong>
          </Typography>
          <Typography fontSize={14} color="text.secondary">
            Booking Date: <strong>{bookingDate}</strong>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
            <Chip 
              label={`Status: ${getBookingStatusDisplay(bookingStatus)}`}
              color={getStatusColor(bookingStatus)}
              size="small"
            />
            {paymentStatus && paymentStatus !== bookingStatus && (
              <Chip 
                label={`Payment: ${getPaymentStatusDisplay(paymentStatus)}`}
                color={getStatusColor(paymentStatus)}
                size="small"
                icon={<PaymentOutlinedIcon />}
              />
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Student */}
        <Box mb={3}>
          <Typography fontWeight={600} mb={1}>
            Student Information
          </Typography>
          <Typography fontSize={14} color="text.secondary">
            Student Name: <strong>{studentName}</strong>
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Program Details */}
        <Box mb={3}>
          <Typography fontWeight={600} mb={1}>
            Program Details
          </Typography>

          <Box
            sx={{
              bgcolor: '#F9FAFB',
              borderRadius: 2,
              p: 2.5,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2.5
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Program Name
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {programName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Mentor Name
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {mentorName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Start Date & Time
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {startDateTime}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                End Date & Time
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {endDateTime}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Duration
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {sessionDuration}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Location
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body1" fontWeight={600}>
                  {sessionLocation}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Payment Information */}
        <Box mb={3}>
          <Typography fontWeight={600} mb={1}>
            Payment Information
          </Typography>
          <Box
            sx={{
              bgcolor: '#F9FAFB',
              borderRadius: 2,
              p: 2.5,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2.5
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Payment Method
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {paymentMethod}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Payment Status
              </Typography>
              <Chip 
                label={getPaymentStatusDisplay(paymentStatus)}
                color={getStatusColor(paymentStatus)}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Pricing */}
        <Box mb={3}>
          <InfoRow
            label="Subtotal"
            value={`$${formatAmount(totalAmount)}`}
            bold
          />

          <Box
            mt={2}
            p={2}
            borderRadius={2}
            bgcolor="#F3F6FA"
            display="flex"
            justifyContent="space-between"
          >
            <Typography fontWeight={600}>Total Amount</Typography>
            <Typography fontWeight={700} color="#2e7d32">
              ${formatAmount(totalAmount)}
            </Typography>
          </Box>
        </Box>

        {/* Action */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<DownloadOutlinedIcon />}
          onClick={handleDownloadInvoice}
          sx={{
            background: "#E9EEF3",
            color: "#06112E",
            fontWeight: 600,
            "&:hover": {
              background: "#dfe6ec",
            },
          }}
        >
          Download Invoice
        </Button>
      </DialogContent>
    </Dialog>
  );
}

/* Reusable row */
function InfoRow({ label, value, bold }) {
  return (
    <Box display="flex" justifyContent="space-between" mb={0.75}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={bold ? 600 : 500}>{value}</Typography>
    </Box>
  );
}
