import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptionsService.getAll();
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error al obtener adopciones" });
  }
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
    res.send({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error al obtener la adopción" });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { user, pet, message } = req.body;

    const userObj = await usersService.getUserById(user);
    if (!userObj) return res.status(404).send({ status: "error", error: "User not found" });

    const petObj = await petsService.getBy({ _id: pet });
    if (!petObj) return res.status(404).send({ status: "error", error: "Pet not found" });

    if (petObj.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });

    const newAdoption = await adoptionsService.create({
      owner: userObj._id,
      pet: petObj._id,
      message
    });

    res.send({ status: "success", message: "Adoption request created", payload: newAdoption });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: "Error al crear solicitud" });
  }
};

const updateAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const updateData = req.body;

    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });

    await adoptionsService.update(adoptionId, updateData);
    res.send({ status: "success", message: "Solicitud actualizada" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error al actualizar solicitud" });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });

    await adoptionsService.delete(adoptionId);
    res.send({ status: "success", message: "Solicitud eliminada" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error al eliminar solicitud" });
  }
};

export default {
  getAllAdoptions,
  getAdoption,
  createAdoption,
  updateAdoption,
  deleteAdoption,
};
