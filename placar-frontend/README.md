# 🧠 Projeto: Placar Eletrônico Futebol

Placar eletrônico em tempo real desenvolvido para transmissões em um canal no YouTube, com design inspirado nas cores do **Fortaleza Esporte Clube**, integração com **OBS Studio**, efeitos visuais e sonoros, e controle remoto via painel web.

---

## ⚽ Funcionalidades

- ✅ Placar dinâmico em tempo real (via Socket.IO)
- ✅ Cronômetro de jogo com controle remoto (iniciar, pausar, zerar)
- ✅ Alteração dos nomes dos times e escudos
- ✅ Exibição do tempo de jogo (1ºT, 2ºT, intervalo, etc.)
- ✅ Animação e áudio personalizados ao sair gol do Fortaleza
- ✅ Painel de controle acessível via navegador
- ✅ Compatível com OBS Studio (modo tela cheia ou sobreposição)
- ✅ Totalmente responsivo

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Vue 3 (Composition API)
- **Backend**: Node.js + Express + Socket.IO
- **Estilização**: CSS puro com animações e layout responsivo
- **Mídia**: Áudio personalizado de gol (Fortaleza)
- **Ferramentas**: Vite, ESLint, VSCode, OBS Studio

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/placar-eletronico-futebol.git
cd placar-eletronico-futebol

Instale as dependências
Backend:
cd placar-backend
npm install
npm run dev

Frontend:
cd ../placar-frontend
npm install
npm run dev

Acesse no navegador
Placar: http://localhost:5173
Painel de controle: http://localhost:5173 (pode ser o mesmo, se estiver tudo em uma tela)

📂 Estrutura do Projeto
Copiar
Editar
placar-eletronico-futebol/
├── placar-backend/
│   └── server.js
├── placar-frontend/
│   ├── src/components/
│   │   ├── GameScoreboard.vue
│   │   └── ControlPanel.vue
│   └── main.js

🎯 Próximos Passos
 Modo compacto (placar para canto de tela)
 Histórico/exportação dos dados
 Upload de escudos ao invés de URL
 Interface mobile do painel

🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, pull requests ou sugerir melhorias.

📃 Licença
Este projeto está sob a licença MIT. Veja LICENSE para mais detalhes.