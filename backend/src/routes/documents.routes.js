// Rotas de documentos: define os endpoints e delega ao controller.
// Uploads são gravados no filesystem local via multer com diskStorage.

const express = require('express');
const multer = require('multer');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const documentsController = require('../controllers/documents.controller');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STORAGE_DIR),
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('file'), documentsController.upload);
router.get('/documents', documentsController.list);
router.get('/documents/:id/download', documentsController.download);

module.exports = router;
