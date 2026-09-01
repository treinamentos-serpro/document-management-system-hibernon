// Botão de download de um documento: abre o endpoint de download do backend.

import { getDownloadUrl } from '../../services/documentsApi';

export default function DownloadButton({ documentId, originalName }) {
  return (
    <a href={getDownloadUrl(documentId)} download={originalName}>
      Baixar
    </a>
  );
}
