# AdoptMe 🐾

Proyecto backend para gestionar adopciones de mascotas.  
Incluye: Docker, Swagger, tests funcionales, mocking, logger y manejo de errores.

---

## 🚀 Tecnologías principales
- Node.js
- Express
- MongoDB + Mongoose
- Docker
- Swagger (documentación)
- Mocha + Chai + Supertest (tests)
- Winston (logger)
- Faker.js (mocks)

---

## 🧪 Tests funcionales

```bash

npm test

-------------------------

📦 Imagen Docker
El proyecto está dockerizado.
Imagen publicada en Docker Hub:
👉 https://hub.docker.com/r/kevinfuchs/adoptme

--------------------------------------------------------


📄 Documentación (Swagger)
Documentación generada con archivos YAML, ubicada en /src/docs/pets.yaml.
Incluye rutas GET y POST de mascotas, con descripción, parámetros, responses y seguridad.

Para probarla:

Levantar el servidor (npm start).

Ir a: http://localhost:8080/docs
    
--------------------------------------------------------

🐞 Manejo de errores
Middleware errorHandler para capturar y enviar errores controlados en todas las rutas.

--------------------------------------------------------

Autor: Kevin Fuchs