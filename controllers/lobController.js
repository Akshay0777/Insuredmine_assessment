const Lob = require('../models/lobModel');

// Create a new line of business
exports.createLob = async (req, res) => {
  try {
    const lob = new Lob(req.body);
    await lob.save();
    res.status(201).json(lob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lines of business
exports.getAllLobs = async (req, res) => {
  try {
    const lobs = await Lob.find();
    res.json(lobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get line of business by ID
exports.getLobById = async (req, res) => {
  try {
    const lob = await Lob.findById(req.params.id);
    if (!lob) {
      return res.status(404).json({ message: 'Line of business not found' });
    }
    res.json(lob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update line of business
exports.updateLob = async (req, res) => {
  try {
    const lob = await Lob.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lob) {
      return res.status(404).json({ message: 'Line of business not found' });
    }
    res.json(lob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete line of business
exports.deleteLob = async (req, res) => {
  try {
    const lob = await Lob.findByIdAndDelete(req.params.id);
    if (!lob) {
      return res.status(404).json({ message: 'Line of business not found' });
    }
    res.json({ message: 'Line of business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
