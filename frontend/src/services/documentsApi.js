// Cliente de API do DMS. Consome o backend via fetch usando o prefixo /api
// (proxy configurado no Vite para http://localhost:3000).

const API_BASE_URL = '/api';

// Envia um documento para o backend via multipart/form-data.
export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  if (owner) {
    formData.append('owner', owner);
  }

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));
    throw new Error(erro.erro || 'Falha ao enviar o documento.');
  }

  return response.json();
}

// Busca a lista de documentos cadastrados.
export async function listDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`);

  if (!response.ok) {
    throw new Error('Falha ao listar os documentos.');
  }

  return response.json();
}

// Monta a URL de download de um documento pelo id.
export function getDownloadUrl(id) {
  return `${API_BASE_URL}/documents/${id}/download`;
}
