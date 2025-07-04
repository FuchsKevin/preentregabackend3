import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import { expect } from 'chai';

describe('Tests funcionales: Adoption Router', () => {
  let createdAdoptionId;
  let userId;
  let petId;

  before(async () => {
    // Crear usuario de prueba
    const userRes = await request(app)
      .post('/api/users')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: `testuser${Date.now()}@mail.com`,
        age: 30,
        password: '1234'
      });
    userId = userRes.body.payload?._id;

    // Crear mascota de prueba
    const petRes = await request(app)
      .post('/api/pets')
      .send({
        name: 'TestPet',
        specie: 'dog',
        birthDate: '2020-01-01',
        adopted: false
      });
    petId = petRes.body.payload?._id;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('✅ Debe crear un usuario de prueba correctamente', async () => {
    expect(userId).to.be.a('string');
  });

  it('✅ Debe crear una mascota de prueba correctamente', async () => {
    expect(petId).to.be.a('string');
  });

  it('✅ GET /api/adoption - obtener todas las solicitudes', async () => {
    const res = await request(app).get('/api/adoption');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('payload');
    expect(res.body.payload).to.be.an('array');
  });

  it('✅ POST /api/adoption - crear una solicitud', async () => {
    const res = await request(app)
      .post('/api/adoption')
      .send({ user: userId, pet: petId, message: 'quiero adoptar' });

    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload).to.have.property('_id');
    createdAdoptionId = res.body.payload._id;
  });

  it('✅ GET /api/adoption/:id - obtener una solicitud por ID', async () => {
    const res = await request(app).get(`/api/adoption/${createdAdoptionId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload._id).to.equal(createdAdoptionId);
  });

  it('✅ PUT /api/adoption/:id - actualizar estado de la solicitud', async () => {
    const res = await request(app)
      .put(`/api/adoption/${createdAdoptionId}`)
      .send({ status: 'approved' });

    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('Solicitud actualizada');
  });

  it('✅ DELETE /api/adoption/:id - eliminar solicitud', async () => {
    const res = await request(app).delete(`/api/adoption/${createdAdoptionId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('Solicitud eliminada');
  });
});
