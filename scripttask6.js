
const tasksDB = {
    1: [
            { text: "Вычислите: 4/25 + 15/4 (ответ дайте в десятичных дробях)", answer: "3,91", exp: "4/25 + 15/4 = 4*4 + 25*15 / 25*4 = 16+275 / 100 = 391 / 100 = 3,91" }
    ],
    2: [
            { text: "Решите уравнение 2−3(2x+2) = 5−4x", answer: "-4,5", exp: "Последовательно получаем: 2−3(2x+2)=5−4x ; 2−6x−6 = 5−4x ; x=−4,5" }
    ],
    3: [
            { text: "Решите уравнение 10x+9 = 7x", answer: "-3", exp: "10x+9=7x ; 3x=−9 ; x=−3" }
    ],
    4: [
            { text: "Решите уравнение 4x+7 = 0", answer: "-1,75", exp: "4x+7=0 ; 4x=−7 ; x=− 7/4 ; x=−1,75." }
    ],
    5: [
            { text: "Решите уравнение −9(8−9x) = 4x+5", answer: "1", exp: "−9(8−9x) = 4x+5 ; −72+81x = 4x+5 ; 77x = 77 ; x=1" }
    ],
    6: [
        { text: "Решите уравнение: 4x−4 = 16+2x", answer: "10", exp: "4x−4 = 16+2x ; 4x−2x = 16+4 ; 2x=20 ; x=10" }
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