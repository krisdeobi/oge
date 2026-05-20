const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const PORT = 3000;

// ВАЖНО: отдаём файлы из текущей папки (вебс)
app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// ========== ЧТО УМЕЕТ СЕРВЕР ==========

// 1. Отдать список всех тем
app.get('/api/themes', (req, res) => {
    db.all('SELECT * FROM themes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 2. Отдать задания по номеру типа (например, все задания №6)
app.get('/api/tasks/:type', (req, res) => {
    const type = req.params.type;
    db.all('SELECT * FROM tasks WHERE type_number = ?', [type], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 3. Отдать ОДНО случайное задание нужного типа (для тренировки)
app.get('/api/tasks/:type/random', (req, res) => {
    const type = req.params.type;
    db.get('SELECT * FROM tasks WHERE type_number = ? ORDER BY RANDOM() LIMIT 1', 
        [type], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row || {});
    });
});

// 4. Проверить ответ ученика
app.post('/api/check', (req, res) => {
    const { task_id, user_answer } = req.body;
    
    db.get('SELECT answer FROM tasks WHERE id = ?', [task_id], (err, row) => {
        if (err || !row) {
            res.status(400).json({ error: 'Задание не найдено' });
            return;
        }
        
        // Очищаем ответы от пробелов, запятых и приводим к нижнему регистру
        const correct = row.answer.toString().trim().toLowerCase().replace(',', '.');
        const user = user_answer.toString().trim().toLowerCase().replace(',', '.');
        
        const is_correct = correct === user ? 1 : 0;
        
        // Сохраняем попытку в базу
        db.run('INSERT INTO results (task_id, user_answer, is_correct) VALUES (?, ?, ?)',
            [task_id, user_answer, is_correct]);
        
        res.json({ 
            correct: is_correct === 1,
            right_answer: row.answer 
        });
    });
});

// 5. Получить статистику ученика (сколько решено, сколько правильно)
app.get('/api/stats', (req, res) => {
    db.get(`
        SELECT 
            COUNT(*) as total,
            SUM(is_correct) as correct
        FROM results
    `, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// ========== ЗАПУСК ==========
app.listen(PORT, () => {
});