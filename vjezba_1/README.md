# Vježba 1

- `frontend_app/` – statična HTML/CSS/JS stranica (Render **Static Site**)
- `backend_app/` – REST API u Express.js (Render **Web Service**)

## Lokalno pokretanje

```bash
cd vjezba_1/backend_app && npm install && npm run dev   # http://localhost:3000
# frontend: otvori frontend_app/index.html preko npr. `npx serve vjezba_1/frontend_app`
```

## Endpointi

| Metoda | Putanja | Tijelo |
|---|---|---|
| GET | `/api/health` | – |
| GET | `/api/todos` | – |
| GET | `/api/todos/:id` | – |
| POST | `/api/todos` | `{ "naslov": "..." }` |
| PATCH | `/api/todos/:id` | `{ "naslov"?: "...", "gotovo"?: true }` |
| DELETE | `/api/todos/:id` | – |

## Primjeri s curl

```bash
URL=https://rs-vjezbe-backend.onrender.com
curl $URL/api/health
curl $URL/api/todos
curl -X POST -H "Content-Type: application/json" -d '{"naslov":"Novi zadatak"}' $URL/api/todos
curl -X PATCH -H "Content-Type: application/json" -d '{"gotovo":true}' $URL/api/todos/1
curl -X DELETE $URL/api/todos/2
```
