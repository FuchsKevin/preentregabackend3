import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { uploadDocuments } from '../middlewares/multer.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

// Endpoint para crear usuario - agregado para que los tests funcionen
router.post('/', usersController.createUser);

router.get('/', usersController.getAllUsers);

router.get('/:uid', usersController.getUser);

router.put('/:uid', usersController.updateUser);

router.delete('/:uid', usersController.deleteUser);

/**
 * @swagger
 * /api/users/{uid}/documents:
 *   post:
 *     summary: Subir uno o más documentos para un usuario
 *     tags: [Users]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Documentos subidos correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/:uid/documents', uploadDocuments, usersController.uploadDocuments);

export default router;
