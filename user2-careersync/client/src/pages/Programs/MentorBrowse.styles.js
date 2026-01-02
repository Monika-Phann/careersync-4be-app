import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Button } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "40px auto",
  padding: "0 24px",
  [theme.breakpoints.down("sm")]: {
    margin: "20px auto",
    padding: "0 16px",
  },
}));

export const HeaderSection = styled(Box)({
  textAlign: "center",
  marginBottom: 48,
});

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 800,
  color: "#06112E",
  marginBottom: 8,
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

export const Subtitle = styled(Typography)({
  color: "#6B7A90",
  fontSize: 16,
});

export const SearchWrapper = styled(Box)({
  maxWidth: 600,
  margin: "32px auto 0",
});

export const StyledInput = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    background: "#fff",
    borderRadius: 12,
    "& fieldset": { border: "1px solid #E9EEF3" },
  },
});

export const MentorGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  // CHANGED: Fixed to 2 columns for desktop to match Figma
  gridTemplateColumns: "repeat(2, 1fr)", 
  gap: 32, // Increased gap for better spacing
  alignItems: "stretch",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr", // 1 column on tablets/phones
  },
}));

export const MentorCard = styled(Box)({
  background: "#fff",
  borderRadius: 20, // More rounded like Figma
  padding: "24px",  // Added padding inside the card
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  border: "1px solid #F3F5F8",
  transition: "all 0.2s ease",
  "&:hover": { 
    transform: "translateY(-4px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
  },
});

// Container for the Top Part (Image LEFT, Info RIGHT)
export const CardTopSection = styled(Box)({
  display: "flex",
  gap: "20px",
  marginBottom: "16px",
});

export const MentorImageContainer = styled(Box)({
  width: "100px", 
  height: "100px",
  flexShrink: 0,
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#f0f0f0",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
});

export const MentorInfoColumn = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

export const MentorName = styled(Typography)({
  fontSize: 20, // Bigger name
  fontWeight: 700,
  color: "#06112E",
  lineHeight: 1.2,
  marginBottom: "4px",
});

export const MentorRole = styled(Typography)({
  fontSize: 15,
  color: "#64748B",
  marginBottom: "12px",
  fontWeight: 500,
});

export const StatsStack = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const StatItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& svg": { fontSize: 16 },
  "& span": { fontSize: 13, fontWeight: 500, color: "#475569" }
});

export const DescriptionText = styled(Typography)({
  fontSize: 14,
  color: "#6B7A90",
  lineHeight: 1.6,
  marginBottom: "24px",
  display: "-webkit-box",
  WebkitLineClamp: 3, // Allow 3 lines of text
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minHeight: "4.8em", // Keeps card height consistent
});

export const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  marginTop: "auto",
});

// Light Blue Button (View Profile)
export const ViewProfileButton = styled(Button)({
  flex: 1,
  background: "#E0F2FE", // Light blue background
  color: "#0284C7",      // Dark blue text
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "8px",
  padding: "12px",
  boxShadow: "none",
  "&:hover": { 
    background: "#BAE6FD",
  }
});

// Dark Navy Button (Request Booking)
export const RequestButton = styled(Button)({
  flex: 1,
  background: "#06112E", 
  color: "#FFFFFF",      
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "8px",
  padding: "12px",
  "&:hover": { 
    background: "#0a1d4a",
  },
  "&:disabled": {    
    background: "#E2E8F0",
    color: "#94A3B8"
  }
});
