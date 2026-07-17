// =========================================
// NUR Test Engine
// quiz.js
// UI Version 3
// =========================================

// =========================================
// Показ вопроса
// =========================================

function showQuestion() {

    app.className = "quiz-mode";

    if (!hasNextQuestion()) {

        showResult();

        return;

    }

    const question = getQuestion();

    const progress = Math.round(
        (Engine.index / Engine.questions.length) * 100
    );

    app.innerHTML = `

        ${appHeader("home")}

        <div class="topbar">

            <button
                class="back-btn"
                onclick="showChapter(Engine.currentChapter)">

                ←

            </button>

            <div class="topbar-title">

                Вопрос ${Engine.index + 1} из ${Engine.questions.length}

            </div>

        </div>

        <div class="progress-card">

            <div>

                Прогресс теста

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${progress}%">

                </div>

            </div>

        </div>

        <div class="question-card fade">

            <div class="question-text">

                ${question.q}

            </div>

        </div>

        <div
            id="answers"
            class="answers">

        </div>

    `;

    const container =
        document.getElementById("answers");

    const letters =
        ["A","B","C","D","E","F"];

    question.a.forEach((answerText,index)=>{

        let card =
            document.createElement("div");

        card.className =
            "answer";

        card.innerHTML = `

            <div class="answer-letter">

                ${letters[index]}

            </div>

            <div class="answer-text">

                ${answerText}

            </div>

        `;
        card.dataset.answer = answerText;

        card.onclick = function(){

            checkAnswer(
                card,
                answerText
            );

        };

        container.appendChild(card);

    });

}

// =========================================
// Проверка ответа
// =========================================
function checkAnswer(element, userAnswer) {

    const result = answer(userAnswer);

    const cards = document.querySelectorAll(".answer");

    // отключаем повторный выбор
    cards.forEach(card => {

        card.onclick = null;

    });

    if (result.correct) {

        element.style.background = "#E8F7EF";
        element.style.borderColor = "#16A34A";

        setTimeout(function () {

            showQuestion();

        }, 700);

        return;

    }

    // выбранный неправильный
    element.style.background = "#FDECEC";
    element.style.borderColor = "#DC2626";

    // подсвечиваем правильный
    cards.forEach(card => {

        const answerText = card.dataset.answer ||
            card.querySelector(".answer-text").textContent.trim();

        if (answerText === result.answer) {

            card.style.background = "#E8F7EF";
            card.style.borderColor = "#16A34A";

        }

    });

    setTimeout(function () {

        showQuestion();

    }, 1800);

}
