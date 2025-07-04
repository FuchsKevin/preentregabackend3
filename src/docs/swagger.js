import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { fileURLToPath } from 'url';

// Para resolver rutas en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const petsYaml = fs.readFileSync(path.join(__dirname, '../../docs/pets.yaml'), 'utf8');
const usersYaml = fs.readFileSync(path.join(__dirname, '../../docs/users.yaml'), 'utf8');

// Función para unir specs YAML
function mergeSpecs(...yamls) {
  return yamls.reduce((acc, yml) => {
    const parsed = yaml.parse(yml);
    acc.paths = { ...acc.paths, ...parsed.paths };
    acc.components = {
      ...acc.components,
      ...parsed.components,
      schemas: { ...acc.components?.schemas, ...parsed.components?.schemas },
      securitySchemes: { ...acc.components?.securitySchemes, ...parsed.components?.securitySchemes },
    };
    acc.tags = [...(acc.tags || []), ...(parsed.tags || [])];
    return acc;
  }, {
    openapi: '3.0.1',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'API REST para AdoptMe - Usuarios y Mascotas',
    },
    servers: [
      { url: 'http://localhost:8080/api', description: 'Servidor local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {},
    tags: []
  });
}

const swaggerSpec = mergeSpecs(petsYaml, usersYaml);

export default function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
