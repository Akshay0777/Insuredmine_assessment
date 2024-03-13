const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

/**
 * @swagger
 * tags:
 *   name: Agents
 *   description: Agent management
 */

/**
 * @swagger
 * /agents:
 *   post:
 *     summary: Create a new agent
 *     tags: [Agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
 *         description: Agent created successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/', agentController.createAgent);

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all agents
 *     tags: [Agents]
 *     responses:
 *       '200':
 *         description: A list of agents retrieved successfully
 *       '500':
 *         description: Internal server error
 */

router.get('/', agentController.getAllAgents);

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Get agent by ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       '200':
 *         description: Agent retrieved successfully
 *       '404':
 *         description: Agent not found
 *       '500':
 *         description: Internal server error
 */

router.get('/:id', agentController.getAgentById);

/**
 * @swagger
 * /agents/{id}:
 *   put:
 *     summary: Update agent
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
 *         description: Agent updated successfully
 *       '404':
 *         description: Agent not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:id', agentController.updateAgent);

/**
 * @swagger
 * /agents/{id}:
 *   delete:
 *     summary: Delete agent
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       '200':
 *         description: Agent deleted successfully
 *       '404':
 *         description: Agent not found
 *       '500':
 *         description: Internal server error
 */

router.delete('/:id', agentController.deleteAgent);

module.exports = router;
