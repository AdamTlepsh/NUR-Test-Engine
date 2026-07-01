// =========================================
// NUR Test Engine
// menu.js
// UI Version 2
// =========================================

const app = document.getElementById("app");

// =========================================
// Главное меню
// =========================================

function showBooks() {

    const books = getBooks();

    let html = `
        <div class="hero fade">

            <div class="hero-logo">📖</div>

            <h1>NUR Test Engine</h1>

            <p>
                Проверка знаний по исламским дисциплинам
            </p>

        </div>

        <div class="book-list">
    `;

    books.forEach((book, index) => {

        html += `

            <div class="book-card"
                 onclick="showChapters(${index})">

                <div class="book-icon">

                    📚

                </div>

                <div class="book-info">

                    <div class="book-title">

                        ${book.title}

                    </div>

                    <div class="book-description">

                        ${book.chapters.length} глав

                    </div>

                </div>

            </div>

        `;

    });

    html += `</div>`;

    app.innerHTML = html;

}

// =========================================
// Главы
// =========================================

function showChapters(bookIndex) {

    Engine.currentBook = bookIndex;

    const book = Engine.books[bookIndex];

    let html = `

        <div class="topbar">

            <button
                class="back-btn"
                onclick="showBooks()">

                ←

            </button>

            <div class="topbar-title">

                ${book.title}

            </div>

        </div>

        <div class="chapter-list">

    `;

    book.chapters.forEach((chapter, index) => {

        html += `

            <div class="chapter-card"

                 onclick="loadChapter(${bookIndex},${index});showStart();">

                <div class="chapter-left">

                    <div class="chapter-number">

                        ${index + 1}

                    </div>

                    <div class="chapter-title">

                        ${chapter.title}

                    </div>

                </div>

                <div class="chapter-arrow">

                    →

                </div>

            </div>

        `;

    });

    html += `

        </div>

    `;

    app.innerHTML = html;

}

// =========================================
// Экран перед стартом
// =========================================

function showStart() {

    const book =
        Engine.books[Engine.currentBook];

    const chapter =
        book.chapters[Engine.currentChapter];
            app.innerHTML = `

        <div class="topbar">

            <button
                class="back-btn"
                onclick="showChapters(${Engine.currentBook})">

                ←

            </button>

            <div class="topbar-title">

                ${book.title}

            </div>

        </div>

        <div class="info-card fade">

            <h2>

                ${chapter.title}

            </h2>

            <p>

                Перед началом теста убедитесь,
                что готовы ответить на все вопросы.

            </p>

            <div class="question-count">

                📋 ${chapter.questions.length} вопросов

            </div>

            <div class="button-group">

                <button
                    id="startButton"
                    class="primary-btn">

                    Начать тест

                </button>

                <button
                    id="backButton"
                    class="secondary-btn">

                    ← Вернуться к главам

                </button>

            </div>

        </div>

    `;

    document
        .getElementById("startButton")
        .onclick = function(){

            startQuiz();

            showQuestion();

        };

    document
        .getElementById("backButton")
        .onclick = function(){

            showChapters(

                Engine.currentBook

            );

        };

}