const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccountController');

/**
 * @swagger
 * tags:
 *   name: UserAccount
 *   description: User Account management
 */

/**
 * @swagger
 * /user-accounts:
 *   post:
 *     summary: Create a new user account
 *     tags: [UserAccount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountName:
 *                 type: string
 *               userType:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User account created successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/', userAccountController.createUserAccount);

/**
 * @swagger
 * /user-accounts:
 *   get:
 *     summary: Get all user accounts
 *     tags: [UserAccount]
 *     responses:
 *       '200':
 *         description: A list of user accounts retrieved successfully
 *       '500':
 *         description: Internal server error
 */

router.get('/', userAccountController.getAllUserAccounts);

/**
 * @swagger
 * /user-accounts/{id}:
 *   get:
 *     summary: Get user account by ID
 *     tags: [UserAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Account ID
 *     responses:
 *       '200':
 *         description: User account retrieved successfully
 *       '404':
 *         description: User account not found
 *       '500':
 *         description: Internal server error
 */

router.get('/:id', userAccountController.getUserAccountById);

/**
 * @swagger
 * /user-accounts/{id}:
 *   put:
 *     summary: Update user account
 *     tags: [UserAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountName:
 *                 type: string
 *               userType:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User account updated successfully
 *       '404':
 *         description: User account not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:id', userAccountController.updateUserAccount);

/**
 * @swagger
 * /user-accounts/{id}:
 *   delete:
 *     summary: Delete user account
 *     tags: [UserAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Account ID
 *     responses:
 *       '200':
 *         description: User account deleted successfully
 *       '404':
 *         description: User account not found
 *       '500':
 *         description: Internal server error
 */

router.delete('/:id', userAccountController.deleteUserAccount);

module.exports = router;
