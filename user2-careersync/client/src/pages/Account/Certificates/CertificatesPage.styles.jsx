import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const PageContainer = styled(Box)({
  maxWidth: 1100,
  margin: "0 auto",
  padding: "40px 24px",
});

export const Title = styled(Typography)({
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 8,
});

export const Subtitle = styled(Typography)({
  fontSize: 14,
  color: "#6B7A90",
  marginBottom: 24,
});

export const CardsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 20,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));
