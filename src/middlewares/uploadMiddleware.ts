import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Configuração de onde e como os arquivos serão salvos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pasta onde os arquivos enviados serão salvos (certifique-se de que a pasta 'uploads' existe)
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Cria um nome único usando Timestamp + Extensão original do arquivo
    // Exemplo: 1711928400000-minha-imagem.png
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// Filtro de validação para permitir apenas imagens
const imageFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo inválido. Apenas imagens (JPEG, PNG, WEBP) são permitidas.'));
  }
};

// Exporta o middleware configurado com limite de tamanho (ex: 5MB)
export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5 MB por arquivo
  },
});