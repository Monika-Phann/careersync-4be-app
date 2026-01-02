import { styled } from "@mui/material/styles";
import { Paper, Box, Typography, Button } from "@mui/material";

export const CardWrapper = styled(Paper)({
  borderRadius: 12,
  border: "1px solid #E6EDF5",
  boxShadow: "0px 2px 12px rgba(0,0,0,0.04)",
  backgroundColor: "#FFFFFF",
});

export const CardContentStyled = styled(Box)({
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
});

export const Title = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: "#06112E",
  marginBottom: 6,
});

export const MetaRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 4,
});

export const MetaText = styled(Typography)({
  fontSize: 13,
  color: "#6B7A90",
});

export const Actions = styled(Box)({
  display: "flex",
  gap: 12,
});

export const ViewButton = styled(Button)({
  backgroundColor: "#C6E5FA",
  color: "#06112E",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 8,
  padding: "6px 16px",

  "&:hover": {
    backgroundColor: "#B4DAF3",
  },
});

export const DownloadButton = styled(Button)({
  backgroundColor: "#EFF3F7",
  color: "#06112E",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 8,
  padding: "6px 16px",

  "&:hover": {
    backgroundColor: "#E2E8EE",
  },
});
