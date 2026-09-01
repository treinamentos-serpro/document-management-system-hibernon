# Especificação - Document Management System

## 1. Objetivo

Prover uma aplicação web simples para que usuários enviem, listem e baixem
documentos, com armazenamento estritamente local ao servidor da aplicação.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Autenticação/autorização robusta (apenas identificação simples do usuário)
- Edição ou exclusão de documentos

## 3. Requisitos funcionais

| ID    | Requisito                                            |
| ----- | ---------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento                   |
| RF-02 | O usuário pode listar os documentos enviados         |
| RF-03 | O usuário pode baixar um documento pelo identificador|

## 4. Requisitos não funcionais

| ID     | Requisito                                                   |
| ------ | ----------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local via multer            |
| RNF-02 | Metadados mantidos em memória nesta fase                    |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor)          |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição                          |
| ------------ | ------ | ----------------------------------- |
| id           | string | Identificador único do documento   |
| originalName | string | Nome original do arquivo enviado   |
| size         | number | Tamanho em bytes                   |
| uploadedAt   | string | Data/hora do upload (ISO 8601)     |
| owner        | string | Identificador do usuário dono      |

## 6. Contratos de API

### POST /upload

- Entrada: arquivo (multipart/form-data, campo `file`) e identificador do
  usuário (campo `owner`, opcional; padrão `"anonimo"`)
- Saída: `201 Created` com metadados do documento criado (JSON)
- Erros: `400 Bad Request` quando nenhum arquivo é enviado

### GET /documents

- Saída: `200 OK` com lista de metadados de documentos (JSON)

### GET /documents/:id/download

- Saída: `200 OK` com conteúdo binário do arquivo (streaming do disco)
- Erros: `404 Not Found` quando o `id` não existe

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples (`routes -> controllers -> services ->
  repositories`), sem que camadas internas conheçam camadas externas
- Persistência de arquivos via `multer` com `diskStorage` em
  `backend/storage`; metadados mantidos em memória em um repositório dedicado
- Frontend em React + Vite, organizado em `components/`, `pages/` e
  `services/`, consumindo o backend via `fetch` com prefixo `/api`
- Armazenamento estritamente local, sem provedores externos

## 8. Plano de execução

1. Definir a especificação (este documento) - Passo 1
2. Implementar o backend: rotas, controllers, services e repository de
   documentos, com upload via multer e endpoints de listagem/download - Passo 2
3. Implementar o frontend: componentes de upload, listagem e download,
   consumindo a API via `services/` - Passo 3
4. Integrar backend e frontend, validar o fluxo completo manualmente - Passo 3/4
