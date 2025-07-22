
const questions = {
    toan: [
        { q: "1 + 1 = ?", a: ["1", "2", "3", "4"], correct: 1 },
        { q: "5 x 2 = ?", a: ["10", "12", "8", "7"], correct: 0 }
    ],
    ly: [
        { q: "Tốc độ ánh sáng là bao nhiêu?", a: ["300.000 km/s", "150.000 km/s", "100.000 km/s", "200.000 km/s"], correct: 0 }
    ],
    hoa: [
        { q: "Nguyên tử khối của H là?", a: ["1", "2", "3", "4"], correct: 0 }
    ],
    anh: [
        { q: "'Apple' nghĩa là gì?", a: ["Cam", "Táo", "Nho", "Chuối"], correct: 1 }
    ]
};

function startQuiz() {
    const subject = document.getElementById("subject-select").value;
    const quiz = questions[subject];
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    let resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";
    let score = 0;
    let index = 0;

    function renderQuestion() {
        if (index >= quiz.length) {
            resultContainer.innerHTML = `<h2>Kết quả: ${score}/${quiz.length}</h2>`;
            saveResult(subject, score);
            return;
        }

        let q = quiz[index];
        let html = `<h2>${q.q}</h2>`;
        q.a.forEach((answer, i) => {
            html += `<button onclick="checkAnswer(${i})">${answer}</button><br>`;
        });
        quizContainer.innerHTML = html;
    }

    window.checkAnswer = function(i) {
        if (i === quiz[index].correct) score++;
        index++;
        renderQuestion();
    };

    renderQuestion();
}

function saveResult(subject, score) {
    const data = JSON.parse(localStorage.getItem("quizResults") || "{}");
    if (!data[subject]) data[subject] = [];
    data[subject].push({ score, time: new Date().toLocaleString() });
    localStorage.setItem("quizResults", JSON.stringify(data));
}
