const Carrier = require('../models/carrierModel');

// Create a new carrier
exports.createCarrier = async (req, res) => {
  try {
    const carrier = new Carrier(req.body);
    await carrier.save();
    res.status(201).json(carrier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all carriers
exports.getAllCarriers = async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get carrier by ID
exports.getCarrierById = async (req, res) => {
  try {
    const carrier = await Carrier.findById(req.params.id);
    if (!carrier) {
      return res.status(404).json({ message: 'Carrier not found' });
    }
    res.json(carrier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update carrier
exports.updateCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!carrier) {
      return res.status(404).json({ message: 'Carrier not found' });
    }
    res.json(carrier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete carrier
exports.deleteCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.findByIdAndDelete(req.params.id);
    if (!carrier) {
      return res.status(404).json({ message: 'Carrier not found' });
    }
    res.json({ message: 'Carrier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
