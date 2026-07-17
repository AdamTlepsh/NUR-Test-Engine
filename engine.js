// =========================================
// NUR Test Engine
// engine.js
// Версия 2.0
// =========================================

const Engine = {

    books: [],

    currentBook: null,

    currentChapter: null,

    currentLevel: null,

    currentQuestion: null,

    questions: [],

    order: [],

    index: 0,

    score: 0,

    errors: []

};

// =========================================
// Регистрация книги
// =========================================

function registerBook(book){

    Engine.books.push(book);

}

// =========================================
// Получить список книг
// =========================================

function getBooks(){

    return Engine.books;

}

// =========================================
// Получить главы книги
// =========================================

function getChapters(bookIndex){

    return Engine.books[bookIndex].chapters;

}

// =========================================
// Получить уровни главы
// =========================================

function getLevels(bookIndex, chapterIndex){

    return Engine.books[bookIndex]
        .chapters[chapterIndex]
        .levels;

}

// =========================================
// Загрузить уровень
// =========================================

function loadLevel(bookIndex, chapterIndex, levelIndex){

    Engine.currentBook = bookIndex;

    Engine.currentChapter = chapterIndex;

    Engine.currentLevel = levelIndex;

    Engine.questions =
        Engine.books[bookIndex]
        .chapters[chapterIndex]
        .levels[levelIndex]
        .questions;

}

// =========================================
// Перемешивание массива
// =========================================

function shuffle(array){

    let arr = [...array];

    for(let i = arr.length - 1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];

    }

    return arr;

}

// =========================================
// Начать тест
// =========================================

function startQuiz(){

    Engine.order = [];

    for(let i = 0; i < Engine.questions.length; i++){

        Engine.order.push(i);

    }

    Engine.order = shuffle(Engine.order);

    Engine.index = 0;

    Engine.score = 0;

    Engine.errors = [];

}

// =========================================
// Есть следующий вопрос?
// =========================================

function hasNextQuestion(){

    return Engine.index < Engine.order.length;

}

// =========================================
// Получить вопрос
// =========================================

function getQuestion(){

    let question =

        Engine.questions[

            Engine.order[

                Engine.index

            ]

        ];

    Engine.currentQuestion = question;

    return{

        q : question.q,

        a : shuffle(question.a),

        correct :

            question.a[

                question.c

            ]

    };

}

// =========================================
// Проверить ответ
// =========================================

function answer(userAnswer){

    let q = Engine.currentQuestion;

    let correctAnswer =

        q.a[

            q.c

        ];

    let ok =

        userAnswer ===

        correctAnswer;

    if(ok){

        Engine.score++;

    }
    else{

        Engine.errors.push({

            question : q.q,

            user : userAnswer,

            correct : correctAnswer

        });

    }

    Engine.index++;

    return{

        correct : ok,

        answer : correctAnswer

    };

}

// =========================================
// Получить результат
// =========================================

function getResult(){

    return{

        total :

            Engine.questions.length,

        score :

            Engine.score,

        percent :

            Math.round(

                Engine.score /

                Engine.questions.length

                * 100

            ),

        errors :

            Engine.errors

    };

}