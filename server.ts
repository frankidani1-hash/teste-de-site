import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("leads.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_type TEXT NOT NULL,
    address TEXT,
    message TEXT,
    status TEXT DEFAULT 'Novo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/leads", (req, res) => {
    const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
    res.json(leads);
  });

  app.get("/api/leads/:id", (req, res) => {
    const lead = db.prepare("SELECT * FROM leads WHERE id = ?").get(req.params.id);
    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  });

  app.post("/api/leads", (req, res) => {
    const { name, phone, email, service_type, address, message } = req.body;
    const info = db.prepare(`
      INSERT INTO leads (name, phone, email, service_type, address, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, phone, email, service_type, address, message);
    res.json({ id: info.lastInsertRowid });
  });

  app.patch("/api/leads/:id", (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/leads/:id", (req, res) => {
    db.prepare("DELETE FROM leads WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
