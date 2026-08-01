-- 001_init.sql — esquema inicial.
-- backend/routes/contact.py crea esta tabla automáticamente si no existe (CREATE TABLE IF NOT EXISTS),
-- así que ejecutar este archivo a mano es opcional; se deja aquí como referencia versionada del esquema.

CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
);
