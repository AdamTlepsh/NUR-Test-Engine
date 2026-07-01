// =========================================
// NUR Test Engine
// result.js
// UI Version 2
// =========================================

function showResult() {

    const result = getResult();

    let html = `

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

    if (result.errors.length === 0) {

        html += `

            <p class="mt-20">

                🎉 Поздравляем! Все ответы правильные.

            </p>

        `;

    } else {

        html += `

            <div class="card mt-30">

                <h2>

                    Ошибки

                </h2>

        `;

        result.errors.forEach(error => {

            html += `

                <div class="chapter-card">

                    <div>

                        <div style="font-weight:700;margin-bottom:12px;">

                            ${error.question}

                        </div>

                        <div style="color:#DC2626;margin-bottom:8px;">

                            ❌ ${error.user}

                        </div>

                        <div style="color:#16A34A;">

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
                onclick="showStart()">

                Пройти ещё раз

            </button>

            <button
                class="secondary-btn"
                onclick="showBooks()">

                Главное меню

            </button>

        </div>

        </div>

    `;

    app.innerHTML = html;

}