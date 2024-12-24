import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.resolve(__dirname, '../src/db/cadmium.db');

// Ensure the database directory exists
function ensureDBDirectoryExists() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Open the SQLite database
export function openDB() {
    ensureDBDirectoryExists();
    return new Database(DB_PATH, { verbose: console.log }); // `verbose` logs all queries
}

// Initialize the database and create the table
export function initializeDB() {
    try {
        const db = openDB();
        console.log('******************************************************');
        console.log('**************Initializing database... ***************');
        console.log('******************************************************');
        db.exec(`
            CREATE TABLE IF NOT EXISTS organization_detail (
                id TEXT PRIMARY KEY UNIQUE,
                cd_id TEXT NOT NULL UNIQUE,
                cd_secret TEXT NOT NULL UNIQUE,
                organization_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS projects (
                project_id TEXT NOT NULL UNIQUE PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT,
                organization_id INTEGER NOT NULL,
                is_connected_to_remote BOOLEAN DEFAULT 0,
                remote_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (organization_id) REFERENCES organization_detail (id)
            );
        `);

        // applyMigrations();
        console.log('Database initialized.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
