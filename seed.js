const db = require('./database.js');

// Добавляем темы
db.run("DELETE FROM themes");
db.run("INSERT INTO themes (name, category) VALUES ('Дроби', 'Алгебра')");
db.run("INSERT INTO themes (name, category) VALUES ('Уравнения', 'Алгебра')");
db.run("INSERT INTO themes (name, category) VALUES ('Площади', 'Геометрия')");

// Добавляем задания
db.run("DELETE FROM tasks");

// Задание №6 (пример)
db.run(`
    INSERT INTO tasks (type_number, html_text, answer, explanation) 
    VALUES (6, 'Вычислите: 1/2 + 1/3', '5/6', 'Приводим к общему знаменателю 6: 3/6 + 2/6 = 5/6')
`);

// Задание №6 ещё одно
db.run(`
    INSERT INTO tasks (type_number, html_text, answer, explanation) 
    VALUES (6, 'Вычислите: 2/5 + 1/10', '0.5', '4/10 + 1/10 = 5/10 = 0.5')
`);

// Задание №15 (геометрия)
db.run(`
    INSERT INTO tasks (type_number, html_text, answer, explanation) 
    VALUES (15, 'Найдите площадь треугольника со стороной 6 и высотой 4', '12', 'S = (a * h) / 2 = (6 * 4) / 2 = 12')
`);

console.log('✅ Тестовые задания добавлены в базу!');