import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const PageWrapper = styled(Box)({
  maxWidth: 1100,
  margin: "0 auto",
  padding: "24px 16px 60px",
});

export const TopBar = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 16,
});

export const Card = styled(Box)({});

export const SectionTitle = styled("h3")({
  fontSize: 18,
  fontWeight: 700,
  marginTop: 32,
  marginBottom: 4,
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

export const SessionCard = styled(Box)({
  background: "#fff",
  borderRadius: 14,
  padding: 20,
  marginBottom: 16,
  boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
});

export const SessionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 24,
});

export const Name = styled("div")({
  fontSize: 16,
  fontWeight: 700,
});

export const Role = styled("div")({
  color: "#6b7280",
  fontSize: 14,
  marginBottom: 8,
});

export const MetaRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  color: "#6b7280",
  marginTop: 6,
});

export const Badge = styled("span")(
  ({ success, warning, danger, info }) => ({
    display: "inline-block",
    marginLeft: 8,
    padding: "2px 10px",
    fontSize: 12,
    borderRadius: 20,
    background:
      success ? "#d1fae5" :
      warning ? "#fef3c7" :
      danger ? "#fee2e2" :
      info ? "#e0f2fe" :
      "#e5e7eb",
    color:
      success ? "#065f46" :
      warning ? "#92400e" :
      danger ? "#991b1b" :
      info ? "#0369a1" :
      "#374151",
  })
);

export const ActionGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const LightButton = styled(Button)({
  background: "#cfe9fb",
  color: "#06112E",
  textTransform: "none",
  borderRadius: 8,
  fontWeight: 600,
  "&:hover": {
    background: "#b7def6",
  },
});

export const DangerButton = styled(Button)({
  background: "#ff4d4f",
  color: "#fff",
  textTransform: "none",
  borderRadius: 8,
  fontWeight: 600,
  "&:hover": {
    background: "#e04344",
  },
});

export const PrimaryButton = styled(Button)({});
