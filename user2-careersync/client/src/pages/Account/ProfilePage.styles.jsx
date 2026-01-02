import { styled } from "@mui/material/styles";
import { Box, Button, RadioGroup, FormControlLabel, Radio, TextField, Select } from "@mui/material";

export const PageWrapper = styled(Box)({
  maxWidth: 1100,
  margin: "40px auto",
});

export const Card = styled(Box)({
  background: "#fff",
  borderRadius: 12,
  padding: 32,
});

export const Title = styled("h2")({
  margin: 0,
});

export const Subtitle = styled("p")({
  color: "#6B7A90",
  marginBottom: 10,
});

export const Row = styled(Box)({
  display: "flex",
  gap: 24,
  marginBottom: 24,
  alignItems: "center",
});

export const FieldGroup = styled(Box)({
  flex: 1,
});

export const Label = styled("label")({
  fontSize: 13,
  color: "#7A8699",
});

export const Value = styled(Box)({
  background: "#E9EEF3",
  borderRadius: 8,
  padding: "10px 14px",
  marginTop: 6,
});

export const Avatar = styled("img")({
  width: 64,
  height: 64,
  borderRadius: "50%",
});

export const EditButton = styled(Button)({
  marginTop: 24,
  background: "#C6E5FA",
  color: "#06112E",
  fontWeight: 600,
});

export const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: "row",
  gap: 24,
});

export const StyledRadio = styled(Radio)({
  color: "#1C6FA9",

  "&.Mui-checked": {
    color: "#1C6FA9",
  },
});

export const StyledRadioLabel = styled(FormControlLabel)({
  margin: 0,

  "& .MuiFormControlLabel-label": {
    fontSize: 14,
    color: "#0B132B",
  },
});

export const OneColumnFieldGroup = styled(Box)({
  flex: "0 0 49%", // exactly one column width
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const HelperText = styled(Box)({
  fontSize: 13,
  color: "#1C6FA9",
  marginTop: 4,
  marginBottom: 20,
});

export const TopBar = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 0,
});

// /* =====================
//    INPUTS
// ===================== */

export const StyledInput = styled(TextField)`
  width: 100%;

  & .MuiOutlinedInput-root {
    background-color: #e9eef3;
    border-radius: 8px;
    font-size: 14px;

    & fieldset {
      border: none;
    }
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
  background-color: #e9eef3;
  border-radius: 8px;
  font-size: 14px;

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

// /* =====================
//    BUTTONS
// ===================== */
export const ButtonRow = styled(Box)({
  display: "flex",
  gap: 12,
  marginTop: 32,
});
