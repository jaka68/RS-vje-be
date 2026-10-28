import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, naslov: "Instalirati Node.js", gotovo: true },
  { id: 2, naslov: "Deployati frontend na Render", gotovo: false },
];

app.get("/", (req, res) => {
  res.send("Server radi!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", vrijeme: new Date() });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (!todo) return res.status(404).json({ greska: "Nema tog zadatka" });
  res.json(todo);
});

app.post("/api/todos", (req, res) => {
  const todo = { id: Date.now(), naslov: req.body.naslov, gotovo: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (!todo) return res.status(404).json({ greska: "Nema tog zadatka" });
  todo.gotovo = req.body.gotovo;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id != req.params.id);
  res.json({ poruka: "Obrisano" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server radi na portu " + PORT));
