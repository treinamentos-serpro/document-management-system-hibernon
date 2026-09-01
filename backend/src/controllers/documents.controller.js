// Controller de documentos: trata entrada/saída HTTP e validação básica.

const path = require('node:path');
const documentsService = require('../services/documents.service');

function upload(req, res) {
  if (!req.file) {
    return res.status(400).json({ erro: 'Nenhum arquivo foi enviado.' });
  }

  const document = documentsService.registerUpload(req.file, req.body.owner);
  return res.status(201).json(document);
}

function list(req, res) {
  return res.status(200).json(documentsService.listDocuments());
}

function download(req, res) {
  const document = documentsService.getDocumentById(req.params.id);

  if (!document) {
    return res.status(404).json({ erro: 'Documento não encontrado.' });
  }

  const filePath = path.join(__dirname, '..', '..', 'storage', document.storedName);

  return res.download(filePath, document.originalName, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ erro: 'Arquivo não encontrado no armazenamento.' });
    }
  });
}

module.exports = {
  upload,
  list,
  download,
};
