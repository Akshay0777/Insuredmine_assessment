const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

/**
 * @swagger
 * tags:
 *   name: Policy
 *   description: Policy management
 */

/**
 * @swagger
 * /policies:
 *   post:
 *     summary: Create a new policy
 *     tags: [Policy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               userId:
 *                 type: string
 *               collectionId:
 *                 type: string
 *               companyCollectionId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Policy created successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/', policyController.createPolicy);

/**
 * @swagger
 * /policies:
 *   get:
 *     summary: Get all policies
 *     tags: [Policy]
 *     responses:
 *       '200':
 *         description: A list of policies retrieved successfully
 *       '500':
 *         description: Internal server error
 */

router.get('/', policyController.getAllPolicies);

/**
 * @swagger
 * /policies/{id}:
 *   get:
 *     summary: Get policy by ID
 *     tags: [Policy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy ID
 *     responses:
 *       '200':
 *         description: Policy retrieved successfully
 *       '404':
 *         description: Policy not found
 *       '500':
 *         description: Internal server error
 */

router.get('/:id', policyController.getPolicyById);

/**
 * @swagger
 * /policies/{id}:
 *   put:
 *     summary: Update policy
 *     tags: [Policy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               userId:
 *                 type: string
 *               collectionId:
 *                 type: string
 *               companyCollectionId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Policy updated successfully
 *       '404':
 *         description: Policy not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:id', policyController.updatePolicy);

/**
 * @swagger
 * /policies/{id}:
 *   delete:
 *     summary: Delete policy
 *     tags: [Policy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy ID
 *     responses:
 *       '200':
 *         description: Policy deleted successfully
 *       '404':
 *         description: Policy not found
 *       '500':
 *         description: Internal server error
 */

router.delete('/:id', policyController.deletePolicy);

module.exports = router;
