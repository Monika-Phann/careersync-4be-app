import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function CancelBookingModal({
  open,
  onClose,
  onConfirm,
  bookingName = "this session",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          p: 1,
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", p: 4 }}>
        {/* Title */}
        <Typography fontWeight={700} fontSize={18} mb={1}>
          Cancel Booking
        </Typography>

        {/* Description */}
        <Typography
          color="text.secondary"
          fontSize={14}
          mb={4}
          lineHeight={1.6}
        >
          Are you sure you want to cancel your session
          <br />
          with <strong>{bookingName}</strong>? This action
          <br />
          cannot be undone.
        </Typography>

        {/* Actions */}
        <Box display="flex" gap={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              background: "#E9EEF3",
              color: "#06112E",
              fontWeight: 600,
              borderRadius: 1,
              boxShadow: "none",
              "&:hover": {
                background: "#dfe6ec",
                boxShadow: "none",
              },
            }}
          >
            No, Keep It
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            sx={{
              background: "#E11D2E",
              fontWeight: 600,
              borderRadius: 1,
              boxShadow: "none",
              "&:hover": {
                background: "#c81e2a",
                boxShadow: "none",
              },
            }}
          >
            Yes, Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
