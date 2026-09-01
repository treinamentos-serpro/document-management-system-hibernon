// Componente de upload de documentos: seleciona um arquivo e um dono
// (owner) e envia ao backend via o serviço documentsApi.

import { useState } from 'react';
import { uploadDocument } from '../../services/documentsApi';

export default function UploadComponent({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setErro('Selecione um arquivo para enviar.');
      return;
    }

    setEnviando(true);
    setErro('');

    try {
      const documento = await uploadDocument(file, owner);
      setFile(null);
      event.target.reset();
      onUploaded?.(documento);
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar documento</h2>
      <div>
        <label htmlFor="owner">Usuário</label>
        <input
          id="owner"
          type="text"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          placeholder="Nome do usuário (opcional)"
        />
      </div>
      <div>
        <label htmlFor="file">Arquivo</label>
        <input
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0] ?? null)}
        />
      </div>
      {erro && <p role="alert">{erro}</p>}
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
