import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";
import logger from "../utils/logger.js";

const getAllPets = async (req, res) => {
  try {
    const pets = await petsService.getAll();
    logger.info("Se obtuvieron todas las mascotas");
    res.send({ status: "success", payload: pets });
  } catch (error) {
    logger.error("Error al obtener mascotas:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createPet = async (req, res) => {
  const { name, specie, birthDate } = req.body;

  if (!name || !specie || !birthDate) {
    logger.error("Incomplete values when trying to create a pet");
    return res.status(400).send({ status: "error", error: "Incomplete values" });
  }

  try {
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);
    res.send({ status: "success", payload: result });
  } catch (err) {
    logger.fatal("Unexpected error creating a pet: " + err.message);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const updatePet = async (req, res) => {
  const petUpdateBody = req.body;
  const petId = req.params.pid;

  try {
    const result = await petsService.update(petId, petUpdateBody);
    logger.info(`Mascota actualizada correctamente: ${petId}`);
    res.send({ status: "success", message: "Pet updated" });
  } catch (error) {
    logger.error(`Error al actualizar mascota ${petId}:`, error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const deletePet = async (req, res) => {
  const petId = req.params.pid;

  try {
    const result = await petsService.delete(petId);
    logger.info(`Mascota eliminada: ${petId}`);
    res.send({ status: "success", message: "Pet deleted" });
  } catch (error) {
    logger.error(`Error al eliminar mascota ${petId}:`, error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createPetWithImage = async (req, res) => {
  const file = req.file;
  const { name, specie, birthDate } = req.body;

  if (!name || !specie || !birthDate) {
    logger.warn("Intento de crear mascota con imagen pero con valores incompletos");
    return res.status(400).send({ status: "error", error: "Incomplete values" });
  }

  if (!file) {
    logger.warn("Intento de crear mascota con imagen pero no se recibió archivo");
    return res.status(400).send({ status: "error", error: "No image file uploaded" });
  }

  try {
    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`
    });
    logger.debug("Mascota con imagen recibida:", pet);

    const result = await petsService.create(pet);
    logger.info(`Mascota creada con imagen: ${result._id}`);
    res.send({ status: "success", payload: result });
  } catch (error) {
    logger.error("Error al crear mascota con imagen:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage
};
