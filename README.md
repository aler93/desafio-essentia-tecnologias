# Desafio Essentia Tecnologies

- Close o repositorio `git clone git@github.com:aler93/desafio-essentia-tecnologias.git`
- Acesse o diretório frontend e execute o build `cd desafio-essentia-tecnologias/frontent && ng build`
- Crie uma cópia do arquivo .env.example na raiz do projeto com o nome .env
- Crie uma cópia do arquivo .env.example no diretório backend com o nome .env
  - Configure ambos os arquivos .env com as variáveis corretas (senha para DB, porta do app, etc.)
- Acesse o diretório backend para rodar as migrations `npx sequelize-cli db:migrate`
- Acesso o diretório raiz e inicie o MySQL através do Docker `docker compose up`
  - Use `docker compose up -d` se preferir continuar usando o mesmo terminal
- O docker-compose.yml possui um serviço com Node que deve servir a aplicação na porta configurada no .env

## Ambiente de desenvolvimento
- Acesse o diretório backend e execute `npm run dev`
- Acesse o diretório frontend e execute `npm run start`
- Ambos os serviços devem estar rodando com hot reload