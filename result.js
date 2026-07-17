// =========================================
// NUR Test Engine
// result.js
// Version 3
// =========================================

function showResult(){

    app.className = "result-mode";

    const result = getResult();

    const chapter =

        Engine.books[
            Engine.currentBook
        ].chapters[
            Engine.currentChapter
        ];

    const level =

        chapter.levels[
            Engine.currentLevel
        ];

    let html = `

        ${appHeader("home")}

        <div class="result-card fade">

            <div class="result-icon">

                🏆

            </div>

            <h1>

                Тест завершён

            </h1>

            <div class="result-score">

                ${result.score} / ${result.total}

            </div>

            <div class="result-percent">

                ${result.percent}%

            </div>

    `;

    if(result.errors.length===0){

        html += `

            <p class="mt-20">

                🎉 Все ответы правильные!

            </p>

        `;

    }else{

        html += `

            <div class="card mt-30">

                <h2>

                    Ошибки

                </h2>

        `;

        result.errors.forEach(error=>{

            html += `

                <div class="chapter-card">

                    <div>

                        <div
                            style="font-weight:700;margin-bottom:12px;">

                            ${error.question}

                        </div>

                        <div
                            style="color:#DC2626;margin-bottom:8px;">

                            ❌ ${error.user}

                        </div>

                        <div
                            style="color:#16A34A;">

                            ✅ ${error.correct}

                        </div>

                    </div>

                </div>

            `;

        });

        html += `

            </div>

        `;

    }

    html += `

        <div class="button-group">

            <button

                class="primary-btn"

                onclick="startQuiz();showQuestion();">

                🔄 Повторить тест

            </button>

            <button

                class="secondary-btn"

                onclick="showChapter(Engine.currentChapter)">

                ← К учебному блоку

            </button>

            <button

                class="secondary-btn"

                onclick="showBooks()">

                🏠 Главное меню

            </button>

        </div>

    `;

    app.innerHTML = html;

}
