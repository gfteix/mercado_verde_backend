# Mercado Verde - Backend

Stack:
- Node.js 
- Typescript
- TypeORM
- Express
- Postgres
- Docker

## Como rodar?


### Opção 1

**Requirements**

- Docker

**Steps**
- Crie um arquivo .env na raiz do projeto (use o .env.example como base)
- Execute `docker compose up`

### Opção 2
**Requirements**

- Node
- NPM
- Postgres
    - Instale e configure o Postgres com a mesma configurações usada no .env
    - Ou simplesmente rode o postgres a partir de um container: `docker run --name mercadoverde-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_USER=mercadoverdeuser -e POSTGRES_DB=mercadoverde  -d postgres`

**Steps**

- Crie um arquivo .env na raiz do projeto (use o .env.example como base)
- Rode `npm i`
- Run `npm start`

---

## Endpoints
POST /users (Register)


```
curl --header "Content-Type: application/json" --request POST --data @samples/register-user-sample.json -v http://localhost:6868/api/v1/users
```


POST /login

```
curl --header "Content-Type: application/json" --request POST --data @samples/login-sample.json -v http://localhost:6868/api/v1/login
```

GET /users/profile

```
curl  -H "Authorization: Bearer <YOUR_TOKEN>" -v http://localhost:6868/api/v1/users/profile/
```


PUT /users/profile (Update)

```
curl -H "Authorization: Bearer <YOUR_TOKEN>" -H "Content-Type: application/json" --request PUT --data @samples/update-user-sample.json -v http://localhost:6868/api/v1/users/profile
```

POST /orders 


```
curl -H "Authorization: Bearer <YOUR_TOKEN>" -H "Content-Type: application/json" --request PUT --data @samples/order-sample.json -v http://localhost:6868/api/v1/orders
```