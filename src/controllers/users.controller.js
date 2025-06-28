import { usersService } from '../services/index.js';

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.send({ status: 'success', payload: users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
const getUser = async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.uid);
    if (!user) return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
    res.send({ status: 'success', payload: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al obtener usuario' });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    res.send({ status: 'success', payload: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al crear usuario' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const updated = await usersService.update(req.params.uid, req.body);
    if (!updated) return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
    res.send({ status: 'success', message: 'Usuario actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const deleted = await usersService.delete(req.params.uid);
    if (!deleted) return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
    res.send({ status: 'success', message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al eliminar usuario' });
  }
};

// Subir documentos y agregarlos al usuario
const uploadDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserById(uid);

    if (!user) {
      return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
    }

    const uploadedDocs = req.files.map(file => ({
      name: file.originalname,
      reference: file.path
    }));

    user.documents = (user.documents || []).concat(uploadedDocs);

    await usersService.update(uid, { documents: user.documents });

    res.send({ status: 'success', message: 'Documentos subidos correctamente', payload: uploadedDocs });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: 'Error al subir documentos' });
  }
};

export default {
  getAllUsers,
  getUser,
  createUser, 
  updateUser,
  deleteUser,
  uploadDocuments
};
