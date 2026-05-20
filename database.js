const sqlite3 = require('sqlite3').verbose();

// База данных создастся в этой же папке: вебс/oge_math.db
const db = new sqlite3.Database('./oge_math.db');

function initDatabase() {
    db.serialize(() => {
        
        // Таблица тем (для чек-листа и каталога)
        db.run(`
            CREATE TABLE IF NOT EXISTS themes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT NOT NULL
            )
        `);

        // Таблица заданий
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                theme_id INTEGER,
                type_number INTEGER NOT NULL,
                html_text TEXT NOT NULL,
                answer TEXT NOT NULL,
                explanation TEXT
            )
        `);

        // Таблица результатов (ошибки ученика)
        db.run(`
            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id INTEGER NOT NULL,
                user_answer TEXT NOT NULL,
                is_correct INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('База данных создана: oge_math.db');
    });
}

initDatabase();

module.exports = db;