// URL deployanog web servisa na Renderu (zamijeni nakon deploya!)
// Lokalno: http://localhost:3000
const API_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://rs-vjezbe-backendf.onrender.com";

const listaEl = document.getElementById("lista");
const formaEl = document.getElementById("forma");
const naslovEl = document.getElementById("naslov");

async function api(putanja, opcije = {}) {
  const res = await fetch(API_URL + putanja, {
    headers: { "Content-Type": "application/json" },
    ...opcije,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function prikazi(todos) {
  listaEl.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    if (todo.gotovo) li.classList.add("gotovo");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.gotovo;
    checkbox.addEventListener("change", () => promijeni(todo.id, checkbox.checked));

    const tekst = document.createElement("span");
    tekst.textContent = todo.naslov;

    const obrisi = document.createElement("button");
    obrisi.textContent = "Obriši";
    obrisi.className = "obrisi";
    obrisi.addEventListener("click", () => ukloni(todo.id));

    li.append(checkbox, tekst, obrisi);
    listaEl.append(li);
  }
}

async function ucitaj() {
  try {
    prikazi(await api("/api/todos"));
  } catch (e) {
    listaEl.innerHTML = `<li class="greska">Greška pri dohvaćanju: ${e.message}</li>`;
  }
}

async function promijeni(id, gotovo) {
  await api(`/api/todos/${id}`, { method: "PATCH", body: JSON.stringify({ gotovo }) });
  ucitaj();
}

async function ukloni(id) {
  await api(`/api/todos/${id}`, { method: "DELETE" });
  ucitaj();
}

formaEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const naslov = naslovEl.value.trim();
  if (!naslov) return;
  await api("/api/todos", { method: "POST", body: JSON.stringify({ naslov }) });
  naslovEl.value = "";
  ucitaj();
});

ucitaj();
