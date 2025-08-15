const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const dbConfig = {
  host: "db",
  user: "node",
  password: "node",
  database: "nodedb",
};

const names = [
  "João",
  "Maria",
  "Pedro",
  "Ana",
  "Carlos",
  "Lucia",
  "Rafael",
  "Fernanda",
];

app.get("/", async (_req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);

    const random = names[Math.floor(Math.random() * names.length)];
    await conn.execute("INSERT INTO people (name) VALUES (?)", [random]);

    const [rows] = await conn.execute("SELECT name FROM people ORDER BY name");

    await conn.end();

    let html = "<h1>Full Cycle Rocks!</h1>";
    html += "<ul>";
    for (const r of rows) html += `<li>${r.name}</li>`;
    html += "</ul>";

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno");
  }
});

app.listen(port, () => {
  console.log(`App ouvindo em ${port}`);
});
