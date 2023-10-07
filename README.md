# Divulgador de Eventos

API de um divulgador de eventos.

## Principais Tecnologias

- [Nest](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

## Instalação

```bash
$ npm install
```

## Variáveis de ambiente

Para a execução da aplicação algumas variáveis de ambiente devem estar definidas, o que pode ser feito a partir de um arquivo `.env` na raiz do projeto.

```bash
# APP
PORT=3000

# DATABASE
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=conexao_ufms
```

## Executando a aplicação

```bash
# desenvolvimento
$ npm run start

# watch mode
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

### Executando com Docker

```bash
# stack completa
$ docker-compose up

# apenas o banco de dados
$ docker-compose up db

# apenas a aplicação
$ docker-compose up app
```

## Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# testes com cobertura
$ npm run test:cov
```
