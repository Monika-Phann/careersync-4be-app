// src/middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "..", "uploads");
const documentsDir = path.join(uploadDir, "documents");

// Create directories if they don't exist
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir, { recursive: true });

// Storage for profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `profile-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  }
});

// Storage for documents (CV, certificates, etc.)
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, documentsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `doc-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  }
});

// File filter for profile images (images only)
const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for profile!"), false);
  }
  cb(null, true);
};

// File filter for documents (PDF, images, docs)
const documentFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only PDF, images, and Word documents are allowed!"), false);
  }
  cb(null, true);
};

// Single profile image upload
const uploadProfile = multer({ 
  storage: profileStorage, 
  fileFilter: imageFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Multiple documents upload
const uploadDocuments = multer({ 
  storage: documentStorage, 
  fileFilter: documentFilter, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
});

// Storage for PDF uploads (agenda_pdf, etc.)
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, documentsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `agenda-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  }
});

// PDF upload handler (for agenda_pdf, session_agenda, cv_portfolio)
const uploadPDF = multer({ 
  storage: pdfStorage, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for mentor profile PDFs
});

module.exports = {
  uploadProfile,
  uploadDocuments,
  uploadPDF,
  // For backward compatibility - handles both images and PDFs based on field name
  single: (fieldName) => {
    if (fieldName === 'agenda_pdf' || fieldName === 'file' || fieldName === 'profile_image') {
      // Use appropriate uploader based on field name
      if (fieldName === 'profile_image') {
        return uploadProfile.single(fieldName);
      }
      // Use PDF uploader for agenda_pdf and file fields
      return uploadPDF.single(fieldName);
    }
    // Default to document uploader for other fields
    return uploadDocuments.single(fieldName);
  },
  array: (fieldName, maxCount) => uploadDocuments.array(fieldName, maxCount),
  fields: (fields) => multer({ 
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname === 'profile_image') {
          cb(null, uploadDir);
        } else {
          cb(null, documentsDir);
        }
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const prefix = file.fieldname === 'profile_image' ? 'profile' : 'doc';
        const name = `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, name);
      }
    })
  }).fields(fields)
};