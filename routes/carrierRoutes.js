const express = require('express');
const router = express.Router();
const carrierController = require('../controllers/carrierController');

/**
 * @swagger
 * tags:
 *   name: Carriers
 *   description: Carrier management
 */

/**
 * @swagger
 * /carriers:
 *   post:
 *     summary: Create a new carrier
 *     tags: [Carriers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               website:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Carrier created successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/', carrierController.createCarrier);

/**
 * @swagger
 * /carriers:
 *   get:
 *     summary: Get all carriers
 *     tags: [Carriers]
 *     responses:
 *       '200':
 *         description: A list of carriers retrieved successfully
 *       '500':
 *         description: Internal server error
 */

router.get('/', carrierController.getAllCarriers);

/**
 * @swagger
 * /carriers/{id}:
 *   get:
 *     summary: Get carrier by ID
 *     tags: [Carriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Carrier ID
 *     responses:
 *       '200':
 *         description: Carrier retrieved successfully
 *       '404':
 *         description: Carrier not found
 *       '500':
 *         description: Internal server error
 */

router.get('/:id', carrierController.getCarrierById);

/**
 * @swagger
 * /carriers/{id}:
 *   put:
 *     summary: Update carrier
 *     tags: [Carriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Carrier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               website:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Carrier updated successfully
 *       '404':
 *         description: Carrier not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:id', carrierController.updateCarrier);

/**
 * @swagger
 * /carriers/{id}:
 *   delete:
 *     summary: Delete carrier
 *     tags: [Carriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Carrier ID
 *     responses:
 *       '200':
 *         description: Carrier deleted successfully
 *       '404':
 *         description: Carrier not found
 *       '500':
 *         description: Internal server error
 */

router.delete('/:id', carrierController.deleteCarrier);

module.exports = router;
