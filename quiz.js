// =========================================
// NUR Test Engine
// quiz.js
// UI Version 3
// =========================================

// =========================================
// Показ вопроса
// =========================================

function showQuestion() {

    if (!hasNextQuestion()) {

        showResult();

        return;

    }

    const question = getQuestion();

    const progress = Math.round(
        (Engine.index / Engine.questions.length) * 100
    );

    app.innerHTML = `

        <div class="topbar">

            <button
                class="back-btn"
                onclick="showStart()">

                ←

            </button>

            <div class="topbar-title">

                Тест

            </div>

        </div>

        <div class="progress-card">

            <div>

                Вопрос
                ${Engine.index + 1}
                из
                ${Engine.questions.length}

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${progress}%">

                </div>

            </div>

        </div>

        <div class="question-card">

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

    document
        .querySelectorAll(".answer")
        .forEach(card => {

            card.onclick = null;

        });

    if (result.correct) {

        element.classList.add("selected");

        element.style.background = "#E8F7EF";
        element.style.borderColor = "#16A34A";

        setTimeout(function () {

            showQuestion();

        }, 700);

    }
    else {

        element.style.background = "#FDECEC";
        element.style.borderColor = "#DC2626";

        document
            .querySelectorAll(".answer")
            .forEach(card => {

                const text =
                    card.querySelector(".answer-text").textContent;

                if (text === result.answer) {

                    card.style.background = "#E8F7EF";
                    card.style.borderColor = "#16A34A";

                }

            });

        setTimeout(function () {

            showQuestion();

        }, 1800);

    }

}