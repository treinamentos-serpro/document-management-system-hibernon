// Lista os documentos cadastrados, com opção de baixar cada um.

import DownloadButton from '../DownloadButton';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function DocumentList({ documents, carregando, erro }) {
  if (carregando) {
    return <p>Carregando documentos...</p>;
  }

  if (erro) {
    return <p role="alert">{erro}</p>;
  }

  if (documents.length === 0) {
    return <p>Nenhum documento enviado ainda.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tamanho</th>
          <th>Enviado em</th>
          <th>Usuário</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id}>
            <td>{document.originalName}</td>
            <td>{formatSize(document.size)}</td>
            <td>{new Date(document.uploadedAt).toLocaleString('pt-BR')}</td>
            <td>{document.owner}</td>
            <td>
              <DownloadButton documentId={document.id} originalName={document.originalName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
