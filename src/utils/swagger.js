
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'AdoptMe API',
      description: 'Documentación del módulo de usuarios',
      version: '1.0.0'
    },
    tags: [
      {
        name: 'Users',
        description: 'Operaciones relacionadas con usuarios'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID autogenerado por MongoDB'
            },
            first_name: {
              type: 'string',
              description: 'Nombre del usuario'
            },
            last_name: {
              type: 'string',
              description: 'Apellido del usuario'
            },
            email: {
              type: 'string',
              description: 'Correo electrónico único'
            },
            age: {
              type: 'integer',
              description: 'Edad del usuario'
            },
            password: {
              type: 'string',
              description: 'Contraseña encriptada'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'Rol del usuario'
            },
            pets: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID de mascotas asociadas'
              }
            }
          },
          required: ['first_name', 'last_name', 'email', 'age', 'password'],
          example: {
            _id: '60d0fe4f5311236168a109ca',
            first_name: 'Juan',
            last_name: 'Pérez',
            email: 'juanperez@mail.com',
            age: 30,
            password: '$2b$10$abcde123456',
            role: 'user',
            pets: []
          }
        }
      }
    }
  },
  apis: ['./src/routes/users.router.js'], // agregar más rutas si documentás más adelante
};

const specs = swaggerJSDoc(swaggerOptions);

export { swaggerUiExpress, specs };
