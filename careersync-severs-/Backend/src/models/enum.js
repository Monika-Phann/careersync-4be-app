module.exports = {
  // 🔹 User
  UserRole: ["admin", "mentor", "acc_user"],
  AccountStatus: ["unverified", "verified", "blocked"],
  // 🔹 Mentor
  Gender: ["male", "female", "other"],
  ApprovalStatus: ["pending", "approved", "rejected"],

  // 🔹 AccUser
  AccUserType: ["student", "professional", "institution"],

  // 🔹 Booking
  BookingStatus: ["pending", "confirmed", "completed", "cancelled"],

  // 🔹 Payment / Invoice
  PaymentStatus: ["pending", "paid", "failed", "refunded"],
  PaymentMethod: ["card", "bank_transfer", "cash"],

  // 🔹 Mentor Documents
  DocumentType: ["cv", "certificate", "portfolio"],
};
