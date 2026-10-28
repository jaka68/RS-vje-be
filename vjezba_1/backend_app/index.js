import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory "baza" (resetira se pri svakom restartu servisa)
let todos = [
  { id: 1, naslov: "Instalirati Node.js", gotovo: true },
  { id: 2, naslov: "Deployati frontend na Render", gotovo: false },
];
let nextId = 3;

app.get("/", (req, res) => {
  res.json({
    poruka: "RS vježbe - REST API radi!",
    endpointi: [
      "GET    /api/health",
      "GET    /api/todos",
      "GET    /api/todos/:id",
      "POST   /api/todos       { naslov }",
      "PATCH  /api/todos/:id   { naslov?, gotovo? }",
      "DELETE /api/todos/:id",
    ],
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", vrijeme: new Date().toISOString() });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ greska: "Zadatak nije pronađen" });
  res.json(todo);
});

app.post("/api/todos", (req, res) => {
  const { naslov } = req.body ?? {};
  if (!naslov || typeof naslov !== "string") {
    return res.status(400).json({ greska: "Polje 'naslov' je obavezno" });
  }
  const todo = { id: nextId++, naslov: naslov.trim(), gotovo: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ greska: "Zadatak nije pronađen" });
  const { naslov, gotovo } = req.body ?? {};
  if (typeof naslov === "string") todo.naslov = naslov.trim();
  if (typeof gotovo === "boolean") todo.gotovo = gotovo;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ greska: "Zadatak nije pronađen" });
  const [obrisan] = todos.splice(index, 1);
  res.json(obrisan);
});

app.listen(PORT, () => {
  console.log(`Server sluša na portu ${PORT}`);
});
