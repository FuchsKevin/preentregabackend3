import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Storage personalizado para documentos y mascotas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/others'; // carpeta por defecto

    if (file.fieldname === 'documents') {
      folder = 'uploads/documents';
    } else if (file.fieldname === 'pets') {
      folder = 'uploads/pets';
    }

    const folderPath = path.resolve(folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploader = multer({ storage });

// Middlewares para cada tipo de archivo
const uploadDocuments = uploader.array('documents'); // para subir múltiples documentos
const uploadPets = uploader.array('pets'); // para subir múltiples imágenes de mascotas

export { uploadDocuments, uploadPets };
