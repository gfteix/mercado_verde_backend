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

Requisitos:

- Docker

**Steps**
1. Crie um arquivo .env na raiz do projeto (use o .env.example como base)
2. Execute `docker compose up`

### Opção 2

Requisitos:
- Node
- NPM
- Postgres
    - Instale e configure o Postgres
    - Ou simplesmente rode o postgres a partir de um container: `docker run --name mercadoverde-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_USER=mercadoverdeuser -e POSTGRES_DB=mercadoverde  -d postgres`


1. Crie um arquivo .env na raiz do projeto (use o .env.example como base)
2. `npm i`
3. `npm start`

---

## Endpoints

- Collection do postman: https://github.com/gfteix/mercado_verde_backend/blob/main/mercado-verde.postman_collection.json




**POST /users (Register)**

- Payload (Exemplo)
```
{
    "email": "email@email.com",
    "password": "1234",
    "name": "firstName lastName",
    "street": "street",
    "city": "city",
    "country": "country",
    "zipCode": "zipCode"
}
```
- Response 
```
{
    "user": {
        "email": "email@email.com",
        "name": "firstName lastName",
        "street": "street",
        "city": "city",
        "country": "country",
        "zipCode": "zipCode",
        "id": "799132e1-ee8c-4e2b-bac6-af4cac65b3e8",
        "createdAt": "2024-05-17T01:28:34.257Z",
        "updatedAt": "2024-05-17T01:28:34.257Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OTkxMzJlMS1lZThjLTRlMmItYmFjNi1hZjRjYWM2NWIzZTgiLCJpYXQiOjE3MTU4OTg1MTQsImV4cCI6MTcxNTk4NDkxNH0.HlmtM3dpm1qoEeGHH8gu9wFnvm1bYbH7VeNcbmNYesU"
}
```


**POST /login**

- Payload (Exemplo)
```
{
    "email": "email@email.com",
    "password": "1234"
}
  
```

- Response

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MGZlOWJiMy0zMDhlLTQ3NmEtOTkxZC01NzliM2E4YjcxNjYiLCJpYXQiOjE3MTU4OTg1NTgsImV4cCI6MTcxNTk4NDk1OH0.s8bol-_zsUIjJged8UDBWPCtNawqRqdPrMA4kpK4HGY"
}
```

**GET /users/profile**

```
curl  -H "Authorization: Bearer <YOUR_TOKEN>" -v http://localhost:6868/api/v1/users/profile/
```

- Response 
```
{
    "user": {
        "id": "70fe9bb3-308e-476a-991d-579b3a8b7166",
        "name": "firstName lastName",
        "email": "email@email.com",
        "street": "street",
        "city": "city",
        "country": "country",
        "zipCode": "zipCode",
        "createdAt": "2024-05-16T23:18:37.322Z",
        "updatedAt": "2024-05-16T23:18:37.322Z"
    }
}
```


**PUT /users/profile (Update)**

- Payload

```
{
    "name": "new name 2"
}

```

- Response

```
{
    "user": {
        "id": "70fe9bb3-308e-476a-991d-579b3a8b7166",
        "name": "new name 2",
        "email": "email@email.com",
        "street": "street",
        "city": "city",
        "country": "country",
        "zipCode": "zipCode",
        "createdAt": "2024-05-16T23:18:37.322Z",
        "updatedAt": "2024-05-17T01:30:30.668Z"
    }
}
```


**GET /products**

```
curl  -H "Authorization: Bearer <YOUR_TOKEN>" -v http://localhost:6868/api/v1/products?category=Frutas
```

- Response 
```
{
    "products": [
        {
            "id": "f1cad817-ac16-4f65-ba14-f0084fe965ce",
            "name": "Kiwi",
            "categoryId": "0d6ded5c-bdb5-4567-b7eb-5aa29dc17eab",
            "price": 100,
            "imageUrl": "kiwi.png",
            "createdAt": "2024-05-16T23:18:24.807Z",
            "updatedAt": "2024-05-16T23:18:24.807Z",
            "category": {
                "id": "0d6ded5c-bdb5-4567-b7eb-5aa29dc17eab",
                "name": "Frutas",
                "createdAt": "2024-05-16T23:18:24.807Z",
                "imageUrl": "frutas.png"
            }
        }
    ]
}
```

**POST /orders**

- Payload
```
{
    "items": [
        {
            "productId": "0112d739-46a1-4f35-be09-bf4c6a8c6c5d",
            "quantity": 2
        }
    ]
}

```
- Response

```
{
    "id": "0f15d6cd-882c-45f2-af4c-fa3a9de4e1c8",
    "status": "NEW",
    "total": 200
}
```

**GET /orders**

```
curl  -H "Authorization: Bearer <YOUR_TOKEN>" -v http://localhost:6868/api/v1/orders
```

- Response 

```
{
    "orders": [
        {
            "id": "0f15d6cd-882c-45f2-af4c-fa3a9de4e1c8",
            "totalPrice": 200,
            "status": "NEW",
            "userId": "70fe9bb3-308e-476a-991d-579b3a8b7166",
            "createdAt": "2024-05-17T01:31:03.565Z",
            "updatedAt": "2024-05-17T01:31:03.565Z"
        }
    ]
}
```