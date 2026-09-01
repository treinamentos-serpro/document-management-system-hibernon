// Componente raiz do Document Management System: monta a interface de
// upload, listagem e download de documentos.

import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/documentsApi';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarDocumentos = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const lista = await listDocuments();
      setDocuments(lista);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Document Management System</h1>
      <UploadComponent onUploaded={carregarDocumentos} />
      <h2>Documentos</h2>
      <DocumentList documents={documents} carregando={carregando} erro={erro} />
    </main>
  );
}
