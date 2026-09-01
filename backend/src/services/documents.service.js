// Regras de negócio para documentos: cria os metadados a partir do arquivo
// gravado pelo multer e consulta o repositório.

const { randomUUID } = require('node:crypto');
const documentsRepository = require('../repositories/documents.repository');

function registerUpload(file, owner) {
  const document = {
    id: randomUUID(),
    originalName: file.originalname,
    storedName: file.filename,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner: owner || 'anonimo',
  };

  return documentsRepository.create(document);
}

// Remove campos internos (ex.: storedName) antes de expor o documento na API.
function toPublicDocument(document) {
  const { storedName, ...publicDocument } = document;
  return publicDocument;
}

function listDocuments() {
  return documentsRepository.findAll().map(toPublicDocument);
}

function getDocumentById(id) {
  return documentsRepository.findById(id);
}

module.exports = {
  registerUpload: (file, owner) => toPublicDocument(registerUpload(file, owner)),
  listDocuments,
  getDocumentById,
};
