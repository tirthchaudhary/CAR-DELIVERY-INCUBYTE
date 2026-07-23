const express = require('express');
const {
    createVehicle,
    getVehicles,
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle,
    restockVehicle,
} = require('../controllers/vehicle.controller.js');
const { authenticateUser, authAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

// All vehicle routes require authentication
router.use(authenticateUser);

router.get('/search', searchVehicles);
router.get('/', getVehicles);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', authAdmin, deleteVehicle);

// Inventory routes
router.post('/:id/purchase', purchaseVehicle);
router.post('/:id/restock', authAdmin, restockVehicle);
module.exports = router;