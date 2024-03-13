const express = require('express');
const router = express.Router();
const lobController = require('../controllers/lobController');

/**
 * @swagger
 * tags:
 *   name: LOB
 *   description: Line of Business (LOB) management
 */

/**
 * @swagger
 * /lobs:
 *   post:
 *     summary: Create a new line of business
 *     tags: [LOB]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Line of business created successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/', lobController.createLob);

/**
 * @swagger
 * /lobs:
 *   get:
 *     summary: Get all lines of business
 *     tags: [LOB]
 *     responses:
 *       '200':
 *         description: A list of lines of business retrieved successfully
 *       '500':
 *         description: Internal server error
 */

router.get('/', lobController.getAllLobs);

/**
 * @swagger
 * /lobs/{id}:
 *   get:
 *     summary: Get line of business by ID
 *     tags: [LOB]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Line of business ID
 *     responses:
 *       '200':
 *         description: Line of business retrieved successfully
 *       '404':
 *         description: Line of business not found
 *       '500':
 *         description: Internal server error
 */

router.get('/:id', lobController.getLobById);

/**
 * @swagger
 * /lobs/{id}:
 *   put:
 *     summary: Update line of business
 *     tags: [LOB]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Line of business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Line of business updated successfully
 *       '404':
 *         description: Line of business not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:id', lobController.updateLob);

/**
 * @swagger
 * /lobs/{id}:
 *   delete:
 *     summary: Delete line of business
 *     tags: [LOB]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Line of business ID
 *     responses:
 *       '200':
 *         description: Line of business deleted successfully
 *       '404':
 *         description: Line of business not found
 *       '500':
 *         description: Internal server error
 */

router.delete('/:id', lobController.deleteLob);

module.exports = router;
