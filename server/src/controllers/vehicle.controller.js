const Vehicle = require('../models/Vehicle.model.js');

// POST /api/vehicles - Create new vehicle
const createVehicle = async (req, res) => {
  try {
    const { make, model, category, price, quantity } = req.body;
    if (!make || !model || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const vehicle = await Vehicle.create({
      make,
      model,
      category,
      price,
      quantity,
    });

    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/vehicles - Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/vehicles/search - Search vehicles by make, model, category, or price range
const searchVehicles = async (req, res) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;
    let query = {};
    if (make) query.make = { $regex: make, $options: 'i' };
    if (model) query.model = { $regex: model, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const vehicles = await Vehicle.find(query);
    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/vehicles/:id - Update vehicle details
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, category, price, quantity } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (make !== undefined) vehicle.make = make;
    if (model !== undefined) vehicle.model = model;
    if (category !== undefined) vehicle.category = category;
    if (price !== undefined) vehicle.price = price;
    if (quantity !== undefined) vehicle.quantity = quantity;

    await vehicle.save();
    res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/vehicles/:id - Delete vehicle (Admin only)
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    await vehicle.deleteOne();
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/vehicles/:id/purchase - Purchase vehicle (decrease quantity by 1)
const purchaseVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    if (vehicle.quantity <= 0) {
      return res.status(400).json({ error: 'Vehicle is out of stock' });
    }
    vehicle.quantity -= 1;
    await vehicle.save();
    res.status(200).json({ message: 'Vehicle purchased successfully', vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/vehicles/:id/restock - Restock vehicle quantity (Admin only)
const restockVehicle = async (req, res) => {
  try {
    const { amount } = req.body;
    const restockAmount = amount ? Number(amount) : 1;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    vehicle.quantity += restockAmount;
    await vehicle.save();
    res.status(200).json({ message: 'Vehicle restocked successfully', vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
};