// Repositório de documentos: cuida da persistência dos metadados em memória.
// Os arquivos em si são gravados no filesystem local pelo multer (diskStorage).

const documents = [];

function create(document) {
  documents.push(document);
  return document;
}

function findAll() {
  return documents;
}

function findById(id) {
  return documents.find((document) => document.id === id);
}

module.exports = {
  create,
  findAll,
  findById,
};
