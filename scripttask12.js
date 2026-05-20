// Наша "база данных" заданий
const tasksDB = {
    1: [
            { text: "В фирме «Родник» стоимость (в рублях) колодца из железобетонных колец рассчитывается по формуле С = 6000 + 4100*n где n  — число колец, установленных при рытье колодца. Пользуясь этой формулой, рассчитайте стоимость колодца из 5 колец.", answer: "26500", exp: "Подставим в формулу значение переменной n: C = 6000 + 4100*5 = 265000" }
    ],
    2: [
            { text: "Сила Архимеда, выталкивающая на поверхность погруженное в воду тело, вычисляется по формуле  F = ρgV где  ρ = 1000 кг/м3 — плотность воды, g = 9,8 м/с2 — ускорение свободного падения, а V  — объем тела в кубических метрах. Сила F измеряется в ньютонах. Найдите силу Архимеда, действующую на погруженное в воду тело объемом 0,7 куб. м. Ответ дайте в ньютонах.", answer: "6860", exp: "Подставим значения в формулу: F = ρgV = 1000 * 9,8 * 0,7 = 6860 Н" }
    ],
    3: [
            { text: "В фирме «Эх, прокачу!» стоимость поездки на такси (в рублях) рассчитывается по формуле C = 150=11*(t-5), где t — длительность поездки, выраженная в минутах (t>5). Пользуясь этой формулой, рассчитайте стоимость 15-минутной поездки.", answer: "260", exp: "Подставим время в формулу для расчета стоимости поездки. Имеем: C = 150=11*(15-5) = 260 руб." }
    ],
    4: [
            { text: "Решите уравнение 4x+7 = 0.", answer: "-1,75", exp: "4x+7=0 ⇔ 4x=−7 ⇔ x=− 7/4 ⇔ x=−1,75." }
    ],

    5: [
            { text: "Решите уравнение −9(8−9x) = 4x+5", answer: "1", exp: "−9(8−9x) = 4x+5 ⟺ −72+81x = 4x+5⟺77x = 77⟺ x=1" }
    ],
    6: [
        { text: "Решите уравнение: 4x−4 = 16+2x", answer: "10", exp: "4x−4 = 16+2x ⟺ 4x−2x = 16+4 ⟺ 2x=20 ⟺ x=10" }
    ]

};

let currentTask = null;

function loadTask(number) {
    const tasks = tasksDB[number];
    if (!tasks) {
        alert("Задания для этого номера пока не добавлены.");
        return;
    }

    // Выбираем случайное задание из списка для этого номера
    currentTask = tasks[Math.floor(Math.random() * tasks.length)];

    // Показываем блок с заданием
    document.getElementById('task-placeholder').style.display = 'none';
    document.getElementById('active-task').style.display = 'block';
    
    document.getElementById('task-title').innerText = "Задание №" + number;
    document.getElementById('task-text').innerText = currentTask.text;
    
    // Очищаем прошлые результаты
    document.getElementById('user-answer').value = "";
    document.getElementById('result').innerText = "";
    document.getElementById('explanation').style.display = 'none';
}

function checkAnswer() {
    const userAnswer = document.getElementById('user-answer').value.trim();
    const resultBox = document.getElementById('result');
    const expBox = document.getElementById('explanation');

    if (userAnswer === currentTask.answer) {
        resultBox.innerText = "Правильно! 🎉";
        resultBox.style.color = "green";
    } else {
        resultBox.innerText = "Ошибка. Попробуй еще раз.";
        resultBox.style.color = "red";
    }

    // Показываем объяснение
    expBox.style.display = 'block';
    document.getElementById('exp-text').innerText = currentTask.exp;
}