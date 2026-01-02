import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box, Button } from "@mui/material";

export const PageWrapper = styled(Box)({
  maxWidth: 1100,
  margin: "0 auto",
  padding: "10px 16px",
  marginBottom: 40,
});

export const TabsStyled = styled(Tabs)(({ theme }) => ({
  backgroundColor: "#F3F6FA",
  borderRadius: 14,
  padding: 6,
  minHeight: "auto",
  maxWidth: "100%",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",

  "& .MuiTabs-indicator": {
    display: "none",
  },

  /* Mobile: full width */
  [theme.breakpoints.down("sm")]: {
    borderRadius: 10,
  },
}));

export const TabStyled = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: 14,
  color: "#06112E",
  minHeight: 40,
  minWidth: 160,
  borderRadius: 10,
  padding: "8px 16px",
  gap: 8,

  "&.Mui-selected": {
    backgroundColor: "#C6E5FA",
  },

  "&:hover": {
    backgroundColor: "#E6F3FC",
  },

  /* Tablet */
  [theme.breakpoints.down("md")]: {
    minWidth: 120,
    fontSize: 13,
    padding: "6px 12px",
  },

  /* Mobile */
  [theme.breakpoints.down("sm")]: {
    minWidth: 90,
    fontSize: 12,
    padding: "6px 8px",
    flexDirection: "column",
    gap: 4,

    "& .MuiTab-iconWrapper": {
      marginBottom: 0,
    },
  },
}));

/* Top bar for logout */
export const TopBar = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 16,
});

/* Logout button */
export const LogoutButton = styled(Button)({
  backgroundColor: "#FF4D4F",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 8,
  padding: "6px 14px",

  "&:hover": {
    backgroundColor: "#e04344",
  },
});