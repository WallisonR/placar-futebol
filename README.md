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
