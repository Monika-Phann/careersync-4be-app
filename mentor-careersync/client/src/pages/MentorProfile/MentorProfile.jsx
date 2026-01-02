import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Phone as PhoneIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import axiosInstance from '../../api/axiosInstance';
// ✅ IMPORT AUTH HELPERS to fix the "Header Name" bug
import { getUserData, setUserData } from '../../utils/auth';

/**
 * MentorProfile Component
 */
function MentorProfile() {
  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profileImageUrl: null,
  });

  // UI state
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  // Image upload state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Fetch mentor profile from backend
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/mentors/me/profile');
        const data = response.data;

        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          profileImageUrl: data.profileImageUrl || null,
        });

        // Initialize form data
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
        });

        setImagePreview(data.profileImageUrl || null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(
          err.response?.data?.message ||
          'Failed to load profile. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /**
   * Handle input field changes
   */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Handle image file selection
   */
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Please select a valid image file (JPG, PNG, or GIF)');
      return;
    }

    // Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setImageError('Image size must be less than 2MB');
      return;
    }

    setImageError(null);
    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Remove selected image and revert to original
   */
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(profileData.profileImageUrl);
    setImageError(null);
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSave = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setImageError(null);

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName.trim());
      formDataToSend.append('lastName', formData.lastName.trim());
      formDataToSend.append('email', formData.email.trim().toLowerCase());
      
      if (formData.phoneNumber) {
        formDataToSend.append('phoneNumber', formData.phoneNumber.trim());
      }

      // Append image if a new one was selected
      if (selectedImage) {
        formDataToSend.append('profileImage', selectedImage);
      }

      // Send update request
      const response = await axiosInstance.put('/mentors/me/profile', formDataToSend);

      // ---------------------------------------------------------
      // ✅ FIX: Update Local Storage & Refresh Header
      // ---------------------------------------------------------
      const storedUser = getUserData();
      
      if (storedUser) {
        // Update nested profile object if it exists (common structure)
        if (storedUser.profile) {
            storedUser.profile.firstName = response.data.firstName;
            storedUser.profile.lastName = response.data.lastName;
            // Handle different naming conventions (snake_case vs camelCase)
            storedUser.profile.first_name = response.data.firstName;
            storedUser.profile.last_name = response.data.lastName;
            
            if (response.data.profileImageUrl) {
                storedUser.profile.profileImageUrl = response.data.profileImageUrl;
                storedUser.profile.profile_image_url = response.data.profileImageUrl;
            }
        } 
        
        // Also update root keys just in case
        storedUser.firstName = response.data.firstName;
        storedUser.lastName = response.data.lastName;

        // Save back to browser memory
        setUserData(storedUser);
      }

      // Force a page reload so the Header component re-reads the new name
      window.location.reload();
      // ---------------------------------------------------------

    } catch (err) {
      console.error('Error updating profile:', err);
      setError(
        err.response?.data?.message ||
        'Failed to update profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handle cancel - revert to original data
   */
  const handleCancel = () => {
    setFormData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
    });
    setSelectedImage(null);
    setImagePreview(profileData.profileImageUrl);
    setImageError(null);
    setValidationErrors({});
    setIsEditMode(false);
  };

  /**
   * Get initials for avatar
   */
  const getInitials = () => {
    const first = profileData.firstName?.charAt(0) || '';
    const last = profileData.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'M';
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
      {/* Success/Error Snackbars */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Main Profile Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#030C2B' }}>
              Profile Information
            </Typography>
            {!isEditMode && (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditMode(true)}
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <Grid container spacing={4}>
            {/* Left Column - Profile Picture */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {/* Avatar */}
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={imagePreview || profileData.profileImageUrl}
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: '3rem',
                      backgroundColor: '#1976d2',
                    }}
                  >
                    {getInitials()}
                  </Avatar>

                  {/* Camera Icon Overlay (Edit Mode) */}
                  {isEditMode && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#1976d2',
                        borderRadius: '50%',
                        padding: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                      }}
                      component="label"
                    >
                      <CameraIcon sx={{ color: 'white', fontSize: 24 }} />
                      <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleImageSelect}
                      />
                    </Box>
                  )}
                </Box>

                {/* Upload Button (Edit Mode) */}
                {isEditMode && (
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CameraIcon />}
                      sx={{
                        textTransform: 'none',
                        marginBottom: 1,
                      }}
                    >
                      Upload New Picture
                      <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleImageSelect}
                      />
                    </Button>
                    {selectedImage && (
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<CancelIcon />}
                        onClick={handleRemoveImage}
                        sx={{ textTransform: 'none', color: 'error.main' }}
                      >
                        Remove
                      </Button>
                    )}
                    {imageError && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ display: 'block', marginTop: 1 }}
                      >
                        {imageError}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', marginTop: 1 }}
                    >
                      JPG, PNG or GIF. Max size 2MB
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right Column - Profile Fields */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    required
                    value={isEditMode ? formData.firstName : profileData.firstName}
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                    disabled={!isEditMode}
                    error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    required
                    value={isEditMode ? formData.lastName : profileData.lastName}
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                    disabled={!isEditMode}
                    error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {/* Email Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    required
                    value={isEditMode ? formData.email : profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditMode}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={
                      isEditMode
                        ? formData.phoneNumber
                        : profileData.phoneNumber || ''
                    }
                    onChange={(e) =>
                      handleInputChange('phoneNumber', e.target.value)
                    }
                    disabled={!isEditMode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="+1 (555) 123-4567"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {/* Role (Display Only) */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role"
                    value="Mentor"
                    disabled
                    helperText="Your role cannot be changed"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Action Buttons (Edit Mode) */}
          {isEditMode && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                marginTop: 4,
                paddingTop: 3,
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={saving}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  paddingX: 3,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} /> : null}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  paddingX: 3,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default MentorProfile;