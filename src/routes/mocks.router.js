import { Router } from 'express';
import { generatePet } from '../utils/mockingpets.js';
import { generateUsers } from '../utils/mockingUsers.js';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const router = Router();


router.get('/mockingpets', (req, res) => {
  const pets = [];
  for (let i = 0; i < 100; i++) {
    pets.push(generatePet());
  }
  res.send({ status: 'success', payload: pets });
});


router.get('/mockingusers', (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push(generateUsers());
  }
  res.send({ status: 'success', payload: users });
});


router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;
    const mockUsers = [];
    const mockPets = [];

    for (let i = 0; i < users; i++) {
      mockUsers.push(generateUsers());
    }

    for (let i = 0; i < pets; i++) {
      mockPets.push(generatePet());
    }

    await UserModel.insertMany(mockUsers);
    await PetModel.insertMany(mockPets);

    req.logger.info(`Se insertaron ${users} usuarios y ${pets} mascotas en la base de datos.`);

    res.send({
      status: 'success',
      message: `Se insertaron ${users} usuarios y ${pets} mascotas.`,
    });
  } catch (error) {
    req.logger.error(error.message);
    res.status(500).send({ status: 'error', message: 'Error al generar datos' });
  }
});

export default router;
