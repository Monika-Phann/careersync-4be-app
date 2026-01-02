import { useState } from "react";
import { useSetAtom } from "jotai";
import * as Yup from "yup";
import AccountTabs from "../../../components/AccountTabs/AccountTabs";
import {
  changePasswordAtom,
  passwordLoadingAtom,
  passwordErrorAtom,
  passwordSuccessAtom,
} from "../../../atoms/userAtoms";
import {
  PageWrapper,
  TopBar,
  Card,
  Title,
  Subtitle,
  Row,
  FieldGroup,
  Label,
  StyledInput,
  EditButton,
  ButtonRow,
  HelperText,
} from "./AccountSecurity.styles";
import { Alert, Snackbar } from "@mui/material";
import { useAtomValue } from "jotai";

const initialData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SecurityPage() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Jotai atoms
  const changePassword = useSetAtom(changePasswordAtom);
  const loading = useAtomValue(passwordLoadingAtom);
  const error = useAtomValue(passwordErrorAtom);
  const success = useAtomValue(passwordSuccessAtom);

  const schema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Please confirm new password"),
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Reset form on success
      setFormData(initialData);
    } catch (err) {
      const formatted = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          formatted[e.path] = e.message;
        });
      }
      setErrors(formatted);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
  };

  return (
    <PageWrapper>
      <TopBar />
      <AccountTabs />

      <Card>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
            {error}
          </Alert>
        )}

        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => {}}
          message={success}
        />

        <Title>Change Password</Title>
        <Subtitle>Ensure your account is using a strong password</Subtitle>

        {/* Current Password */}
        <Row>
          <FieldGroup>
            <Label>Current Password *</Label>
            <StyledInput
              type="password"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange("currentPassword")}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              disabled={loading}
            />
          </FieldGroup>
        </Row>

        {/* New Password */}
        <Row>
          <FieldGroup>
            <Label>New Password *</Label>
            <StyledInput
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              disabled={loading}
            />
            <HelperText>Must be at least 8 characters long</HelperText>
          </FieldGroup>
        </Row>

        {/* Confirm Password */}
        <Row>
          <FieldGroup>
            <Label>Confirm New Password *</Label>
            <StyledInput
              type="password"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={loading}
            />
          </FieldGroup>
        </Row>

        {/* Buttons */}
        <ButtonRow>
          <EditButton onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </EditButton>

          <EditButton
            onClick={handleCancel}
            style={{ background: "#E0E0E0", color: "#333" }}
            disabled={loading}
          >
            Cancel
          </EditButton>
        </ButtonRow>
      </Card>
    </PageWrapper>
  );
}
