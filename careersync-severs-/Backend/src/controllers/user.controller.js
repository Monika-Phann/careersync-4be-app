const userService = require("../services/user.service");

exports.getProfile = async (req, res) => {
  try {
    const data = await userService.getProfile(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log('updateProfile controller - req.file:', req.file);
    console.log('updateProfile controller - req.body:', req.body);
    const updatedProfile = await userService.updateProfile(req.user.id, req.body, req.file);
    console.log('updateProfile controller - updatedProfile:', JSON.stringify(updatedProfile, null, 2));
    res.json({ 
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (err) {
    console.error('updateProfile controller error:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    await userService.changePassword(req.user.id, req.body);
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.bookingHistory = async (req, res) => {
  const data = await userService.getBookings(req.user.id);
  res.json(data);
};

// exports.certificateList = async (req, res) => {
//   const data = await userService.getCertificates(req.user.id);
//   res.json(data);
// };

exports.certificateList = async (req, res) => {
  try {
    const data = await userService.getCertificates(req.user.id);
    res.json(data);
  } catch (err) {
    console.error("CERTIFICATE SQL ERROR:", err);
    res.status(500).json({
      message: "Certificate query failed",
      error: err.message
    });
  }
};
