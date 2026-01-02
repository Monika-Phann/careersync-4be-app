// src/controllers/sessionController.js
const sessionService = require("../services/session.service");

exports.createSession = async (req, res) => {
  try {
    // Handle uploaded PDF file
    const agendaPdf = req.file ? req.file.filename : null;
    
    // Prepare session data with uploaded file
    const sessionData = {
      ...req.body,
      agenda_pdf: agendaPdf
    };
    
    const result = await sessionService.createSession(req.user.id, sessionData);
    res.status(201).json({
      message: "Session created successfully!",
      session: result.session
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await sessionService.getMySessions(req.user.id);
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = { ...req.body };
    
    // Handle uploaded PDF file if provided
    if (req.file) {
      updates.agenda_pdf = req.file.filename;
    }
    
    const result = await sessionService.editSession(sessionId, req.user.id, updates);
    
    res.json({ 
      message: "Session updated successfully!",
      session: result.session,
      mentor: result.mentor
    });
  } catch (err) {
    console.error("Edit session error:", err);
    res.status(400).json({ message: err.message });
  }
};

exports.getAvailableSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getAvailableSessions();
    res.json({
      message: "Available sessions retrieved",
      count: sessions.length,
      sessions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};