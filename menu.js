// =========================================
// NUR Test Engine
// menu.js
// Версия 1.0
// =========================================

const app = document.getElementById("app");

// =========================================
// Главное меню
// =========================================

function showBooks(){

    app.innerHTML = "<h1>Выберите книгу</h1>";

    const books = getBooks();

    books.forEach((book,index)=>{

        let card = document.createElement("div");

        card.className = "o";

        card.style.cursor = "pointer";

        card.innerHTML =
            "<b>📖 " +
            book.title +
            "</b>";

        card.onclick = function(){

            showChapters(index);

        };

        app.appendChild(card);

    });

}

// =========================================
// Список глав
// =========================================

function showChapters(bookIndex){

    Engine.currentBook = bookIndex;

    app.innerHTML =
        "<h1>" +
        Engine.books[bookIndex].title +
        "</h1>";

    const chapters =
        getChapters(bookIndex);

    chapters.forEach((chapter,index)=>{

        let card =
            document.createElement("div");

        card.className = "o";

        card.style.cursor = "pointer";

        card.style.marginBottom = "12px";

        card.innerHTML =
            "📘 " +
            chapter.title;

        card.onclick = function(){

            loadChapter(bookIndex,index);

            showStart();

        };

        app.appendChild(card);

    });

    let back =
        document.createElement("button");

    back.innerHTML =
        "← Назад";

    back.onclick =
        showBooks;

    app.appendChild(back);

}

// =========================================
// Экран перед стартом
// =========================================

function showStart(){

    const book =
        Engine.books[
            Engine.currentBook
        ];

    const chapter =
        book.chapters[
            Engine.currentChapter
        ];

    app.innerHTML = `

        <h1>${book.title}</h1>

        <h2>${chapter.title}</h2>

        <p>

            Вопросов:
            ${chapter.questions.length}

        </p>

        <button id="startButton">

            Начать тест

        </button>

        <br><br>

        <button id="backButton">

            ← К главам

        </button>

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