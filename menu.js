// =========================================
// NUR Test Engine 2.0
// menu.js
// Часть 1
// =========================================

const app = document.getElementById("app");

const LEVEL_UNLOCK_PERCENT = 90;

const ASSETS = {
    logo: "assets/platform-logo.png",
    logoDark: "assets/platform-logo-dark.png",
    book: "assets/book-fikh-muyassar.png",
    cap: "assets/feature-cap.png",
    trophy: "assets/feature-trophy.png",
    checklist: "assets/feature-checklist.png",
    levelStar: "assets/level-star-gold.png",
    topicStar: "assets/topic-star-green.png"
};

function platformLogo(){

    return isDarkTheme()
        ? ASSETS.logoDark
        : ASSETS.logo;

}

function isDarkTheme(){

    try{

        return localStorage.getItem(
            "nur-test-engine:theme"
        ) === "dark";

    }catch(error){

        return false;

    }

}

function applyTheme(){

    const dark =
        isDarkTheme();

    document.body.classList.toggle(
        "dark-theme",
        dark
    );

    const labels =
        document.querySelectorAll(
            ".theme-chip span"
        );

    labels.forEach(label=>{

        label.textContent =
            dark
                ? "Светлая тема"
                : "Темная тема";

    });

    const logos =
        document.querySelectorAll(
            ".brand-logo"
        );

    logos.forEach(logo=>{

        logo.src =
            platformLogo();

    });

}

function toggleTheme(){

    const nextTheme =
        isDarkTheme()
            ? "light"
            : "dark";

    try{

        localStorage.setItem(
            "nur-test-engine:theme",
            nextTheme
        );

    }catch(error){}

    applyTheme();

}

function appHeader(active){

    return `

        <header class="app-header">

            <button

                class="brand"

                onclick="showBooks()">

                <img
                    class="brand-logo"
                    src="${platformLogo()}"
                    alt="NUR Test Engine">

            </button>

            <nav class="app-nav">

                <span class="${active === "home" ? "active" : ""}">
                    Главная
                </span>

                <span>
                    О проекте
                </span>

                <span>
                    Контакты
                </span>

            </nav>

            <button

                class="theme-chip"

                onclick="toggleTheme()"

                type="button">

                <span>
                    ${isDarkTheme() ? "Светлая тема" : "Темная тема"}
                </span>
                <i></i>

            </button>

        </header>

    `;

}

applyTheme();

function imageIcon(asset, className, alt){

    return `

        <img
            class="${className || "asset-icon"}"
            src="${asset}"
            alt="${alt || ""}">

    `;

}

function levelStars(count){

    let html = `

        <div class="level-stars">

    `;

    for(let i = 0; i < count; i++){

        html += imageIcon(
            ASSETS.levelStar,
            "level-star",
            ""
        );

    }

    html += `

        </div>

    `;

    return html;

}

function getLevelDisplayTitle(index, fallback){

    return [
        "Базовый",
        "Углубленный",
        "Экспертный"
    ][index] || fallback;

}

function getLevelTone(index){

    return ["green", "gold", "blue"][index] || "green";

}

const originalAnswer = answer;

answer = function(userAnswer){

    const answerResult =
        originalAnswer(userAnswer);

    saveCompletedLevelResult();

    return answerResult;

};

const originalStartQuiz = startQuiz;

startQuiz = function(){

    saveCompletedLevelResult();

    originalStartQuiz();

};

function getLevelStorageKey(
    bookIndex,
    chapterIndex,
    levelIndex
){

    const book =
        Engine.books[bookIndex];

    const chapter =
        book.chapters[chapterIndex];

    const level =
        chapter.levels[levelIndex];

    return [
        "nur-test-engine",
        "result",
        book.id || bookIndex,
        chapter.id || chapterIndex,
        level.id || levelIndex
    ].join(":");

}

function getStoredLevelResult(
    bookIndex,
    chapterIndex,
    levelIndex
){

    try{

        const raw =
            localStorage.getItem(
                getLevelStorageKey(
                    bookIndex,
                    chapterIndex,
                    levelIndex
                )
            );

        if(!raw){

            return{
                best: null,
                last: null
            };

        }

        const parsed =
            JSON.parse(raw);

        return{
            best: Number.isFinite(parsed.best)
                ? parsed.best
                : null,
            last: Number.isFinite(parsed.last)
                ? parsed.last
                : null
        };

    }catch(error){

        return{
            best: null,
            last: null
        };

    }

}

function saveLevelResult(
    bookIndex,
    chapterIndex,
    levelIndex,
    percent
){

    const previous =
        getStoredLevelResult(
            bookIndex,
            chapterIndex,
            levelIndex
        );

    const next = {
        best: previous.best === null
            ? percent
            : Math.max(previous.best, percent),
        last: percent
    };

    try{

        localStorage.setItem(
            getLevelStorageKey(
                bookIndex,
                chapterIndex,
                levelIndex
            ),
            JSON.stringify(next)
        );

    }catch(error){}

}

function saveCompletedLevelResult(){

    if(
        Engine.currentBook === null ||
        Engine.currentChapter === null ||
        Engine.currentLevel === null ||
        !Engine.questions.length ||
        Engine.index < Engine.questions.length
    ){

        return;

    }

    const percent =
        Math.round(
            Engine.score /
            Engine.questions.length *
            100
        );

    saveLevelResult(
        Engine.currentBook,
        Engine.currentChapter,
        Engine.currentLevel,
        percent
    );

}

function formatLevelResult(percent){

    return percent === null
        ? "—"
        : `${percent}%`;

}

function getTheoryStorageKey(type){

    const book =
        Engine.books[Engine.currentBook];

    const chapter =
        book.chapters[Engine.currentChapter];

    return [
        "nur-test-engine",
        type,
        book.id || Engine.currentBook,
        chapter.id || Engine.currentChapter
    ].join(":");

}

function slugifyTheoryTitle(text){

    return text
            .toLowerCase()
            .replace(/[^a-zа-яё0-9]+/gi, "-")
            .replace(/^-+|-+$/g, "");

}

function stripTags(html){

    return html
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();

}

function getStoredTheorySection(type){

    try{

        return localStorage.getItem(
            getTheoryStorageKey(type)
        );

    }catch(error){

        return null;

    }

}

function setStoredTheorySection(type, sectionId){

    try{

        localStorage.setItem(
            getTheoryStorageKey(type),
            sectionId
        );

    }catch(error){}

}

function getTheoryBookmark(){

    return getStoredTheorySection("bookmark");

}

function getTheoryLastSection(){

    return getStoredTheorySection("last-section");

}

function setTheoryLastSection(sectionId){

    setStoredTheorySection(
        "last-section",
        sectionId
    );

}

function getCurrentTheory(){

    const chapter =
        Engine.books[
            Engine.currentBook
        ].chapters[
            Engine.currentChapter
        ];

    return chapter.theory[0];

}

function getTheorySections(){

    const screen =
        getCurrentTheory();

    const content =
        screen.content;

    const headingPattern =
        /<h([34])>(.*?)<\/h\1>/g;

    const sections = [];

    let current = {
        id: "start",
        title: "Начало",
        level: 4,
        content: ""
    };

    let lastIndex = 0;

    let match;

    while((match = headingPattern.exec(content)) !== null){

        current.content +=
            content.slice(
                lastIndex,
                match.index
            );

        if(stripTags(current.content)){

            sections.push(current);

        }

        const level =
            Number(match[1]);

        const title =
            stripTags(match[2]);

        current = {
            id:
                slugifyTheoryTitle(title) ||
                `section-${sections.length}`,
            title: title,
            level: level,
            content: ""
        };

        lastIndex =
            headingPattern.lastIndex;

    }

    current.content +=
        content.slice(lastIndex);

    if(stripTags(current.content)){

        sections.push(current);

    }

    if(
        sections.length > 1 &&
        sections[0].id === "start"
    ){

        sections[1].content =
            sections[0].content +
            sections[1].content;

        sections.shift();

    }

    return sections.map((section,index)=>({
        ...section,
        id:
            section.id +
            "-" +
            index,
        index: index
    }));

}

function getTheorySection(sectionId){

    const sections =
        getTheorySections();

    return sections.find(section=>
        section.id === sectionId
    ) || sections[0];

}

function getInitialTheorySectionId(){

    const sections =
        getTheorySections();

    const saved =
        getTheoryLastSection() ||
        getTheoryBookmark();

    if(
        saved &&
        sections.some(section=>
            section.id === saved
        )
    ){

        return saved;

    }

    return sections[0].id;

}

function getTheorySectionPosition(sectionId){

    const sections =
        getTheorySections();

    return{
        sections: sections,
        index: sections.findIndex(section=>
            section.id === sectionId
        )
    };

}

function saveTheoryBookmark(sectionId){

    setStoredTheorySection(
        "bookmark",
        sectionId
    );

    showTheory(sectionId);

}

function buildTheoryContent(section){

    if(section.id === "start"){

        return section.content;

    }

    return `

        <h${section.level}>

            ${section.title}

        </h${section.level}>

        ${section.content}

    `;

}

function showTheoryToc(){

    showTheory(null, true);


}

function isLevelUnlocked(levelIndex){

    if(levelIndex === 0){

        return true;

    }

    const previous =
        getStoredLevelResult(
            Engine.currentBook,
            Engine.currentChapter,
            levelIndex - 1
        );

    return previous.best !== null &&
        previous.best >= LEVEL_UNLOCK_PERCENT;

}

// =========================================
// Главное меню
// =========================================

function showBooks(){

    app.className = "";

    saveCompletedLevelResult();

    const books = getBooks();

    let html = `

        ${appHeader("home")}

        <section class="home-hero fade">

            <div class="hero-copy">

                <h1>
                    Проверяй знания.<br>
                    Приумножай мудрость.
                </h1>

                <p>
                    Интерактивные тесты и учебные материалы
                    по исламским наукам для укрепления знаний
                    и понимания.
                </p>

            </div>

        </section>

        <section class="section-heading">

            <h2>
                Выберите книгу для тестирования
            </h2>

        </section>

        <div class="book-grid">

    `;

    books.forEach((book,index)=>{

        html += `

            <button class="book-card"

                onclick="showChapters(${index})">

                <div class="book-icon">

                    <img
                        src="${ASSETS.book}"
                        alt="">

                </div>

                <div class="book-info">

                    <div class="book-title">

                        ${book.title}

                    </div>

                    <div class="book-description">

                        Основы исламского права
                        в вопросах и ответах

                    </div>

                    <span class="book-action">
                        Выбрать →
                    </span>

                </div>

            </button>

        `;

    });

    html += `

        </div>

        <div class="feature-strip">

            <div>
                ${imageIcon(ASSETS.cap, "feature-icon", "")}
                <strong>Систематическое обучение</strong>
                <span>По темам и разделам книги</span>
            </div>

            <div>
                ${imageIcon(ASSETS.trophy, "feature-icon", "")}
                <strong>Мгновенный результат</strong>
                <span>Результат сразу после теста</span>
            </div>

            <div>
                ${imageIcon(ASSETS.checklist, "feature-icon", "")}
                <strong>Отслеживание прогресса</strong>
                <span>Продолжайте с нужного места</span>
            </div>

        </div>

    `;

    app.innerHTML = html;

}

// =========================================
// Учебные блоки
// =========================================

function showChapters(bookIndex){

    app.className = "";

    saveCompletedLevelResult();

    Engine.currentBook = bookIndex;

    const book = Engine.books[bookIndex];

    let html = `

        ${appHeader("home")}

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

        <section class="section-heading">

            <h2>
                Выберите учебный блок
            </h2>

        </section>

        <div class="chapter-list">

    `;

    book.chapters.forEach((chapter,index)=>{

        html += `

            <div

                class="chapter-card"

                onclick="showChapter(${index})">

                <div class="chapter-left">

                    <div class="chapter-number">

                        ${index+1}

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
// Экран учебного блока
// =========================================

function showChapter(chapterIndex){

    app.className = "course-mode";

    saveCompletedLevelResult();

    Engine.currentChapter = chapterIndex;

    const book =

        Engine.books[Engine.currentBook];

    const chapter =

        book.chapters[chapterIndex];

    const levels =

        chapter.levels;

    let html = `

        ${appHeader("home")}

        <div class="topbar">

            <button

                class="back-btn"

                onclick="showChapters(${Engine.currentBook})">

                ←

            </button>

            <div class="topbar-title">

                ${chapter.title}

            </div>

        </div>

        <section class="course-hero fade">

            <div>

                <span class="eyebrow">
                    Текущий раздел
                </span>

                <h1>
                    ${chapter.title}
                </h1>

                <p>
                    ${chapter.description}
                </p>

                <button

                    class="primary-btn course-action"

                    onclick="showTheory()">

                    Изучить материал →

                </button>

            </div>

        </section>

        <section class="section-heading">

            ${imageIcon(ASSETS.cap, "heading-icon", "")}

            <h2>
                Уровни освоения материала
            </h2>

        </section>

        <div class="level-list">

    `;

    levels.forEach((level,index)=>{

        const result =
            getStoredLevelResult(
                Engine.currentBook,
                Engine.currentChapter,
                index
            );

        const unlocked =
            isLevelUnlocked(index);

        const lockText =
            index === 0
                ? ""
                : `Нужно ${LEVEL_UNLOCK_PERCENT}% на предыдущем уровне`;

        html += `

            <div class="level-card ${unlocked ? "" : "locked"} tone-${getLevelTone(index)}">

                <div class="level-header">

                    ${levelStars(index + 1)}

                    <div class="level-title">

                        ${getLevelDisplayTitle(index, level.title)}

                    </div>

                    <div class="level-pass">

                        Проходной балл:
                        ${level.passScore}%

                    </div>

                </div>

                <div class="level-info">

                    ${index === 0 ? "Проверка базового понимания" : index === 1 ? "Углубленное понимание" : "Сложные вопросы и ситуации"}

                </div>

                <div class="level-metrics">

                    <div>
                        <span>Лучший результат</span>
                        <strong>${formatLevelResult(result.best)}</strong>
                    </div>

                    <div>
                        <span>Последний результат</span>
                        <strong>${formatLevelResult(result.last)}</strong>
                    </div>

                </div>

                ${
                    unlocked
                    ? `
                        <button

                            class="primary-btn"

                            onclick="startLevel(${index})">

                            Тестировать

                        </button>
                    `
                    : `
                        <button

                            class="secondary-btn"

                            disabled>

                            Заблокировано

                        </button>
                    `
                }

            </div>

        `;

    });

    html += `

        </div>

    `;

    app.innerHTML = html;

}

// =========================================
// Материал
// =========================================

function showTheory(sectionId, tocOpen){

    app.className = "theory-mode";

    const chapter =

        Engine.books[
            Engine.currentBook
        ].chapters[
            Engine.currentChapter
        ];

    const targetSectionId =
        sectionId ||
        getInitialTheorySectionId();

    const section =
        getTheorySection(targetSectionId);

    const position =
        getTheorySectionPosition(section.id);

    const sections =
        position.sections;

    const currentIndex =
        position.index;

    const bookmark =
        getTheoryBookmark();

    const lastSection =
        getTheoryLastSection();

    const isTocOpen =
        tocOpen === undefined
            ? !sectionId
            : tocOpen;

    setTheoryLastSection(section.id);

    let html = `

        ${appHeader("home")}

        <div class="topbar">

            <button

                class="back-btn"

                onclick="showChapter(${Engine.currentChapter})">

                ←

            </button>

            <div class="topbar-title">

                ${chapter.title}

            </div>

        </div>

        <article class="info-card fade theory-card">

            ${
                isTocOpen
                    ? ""
                    : `
                        <button

                            class="theory-toc-toggle"

                            onclick="showTheory('${section.id}', true)">

                            <span>← Назад</span>

                        </button>
                    `
            }

            ${
                isTocOpen
                    ? `
                        <div class="theory-toc-heading">

                            <h1>
                                ${chapter.title}
                            </h1>

                            <p>
                                Выберите тему для изучения
                            </p>

                        </div>

                        <div class="theory-section-list">

                            ${
                                sections.map(item=>`
                                    <button

                                        class="theory-section-item level-${item.level} ${item.id === section.id ? "is-current" : ""}"

                                        onclick="showTheory('${item.id}', false)">

                                        ${imageIcon(ASSETS.topicStar, "topic-icon", "")}

                                        <span class="section-title">

                                            ${item.title}

                                        </span>

                                        <small>

                                            ${
                                                bookmark === item.id
                                                    ? "🔖"
                                                    : lastSection === item.id
                                                        ? "Продолжить"
                                                        : "›"
                                            }

                                        </small>

                                    </button>
                                `).join("")
                            }

                        </div>
                    `
                    : `
                        <div class="theory-reader-header">

                            <div>

                                <div class="theory-progress-label">

                                    Раздел ${currentIndex + 1} из ${sections.length}

                                </div>

                                <h2>

                                    ${section.title}

                                </h2>

                            </div>

                            <button

                                class="bookmark-btn ${bookmark === section.id ? "is-saved" : ""}"

                                onclick="saveTheoryBookmark('${section.id}')">

                                🔖 Закладка

                            </button>

                        </div>

                        <div class="theory-text">

                            ${buildTheoryContent(section)}

                        </div>
                    `
            }

        </article>

        <div class="button-group subtle-bottom">

            <button

                class="secondary-btn"

                onclick="showChapter(${Engine.currentChapter})">

                ← К учебному блоку

            </button>

        </div>

    `;

    app.innerHTML = html;

    if(typeof window !== "undefined"){

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


}

// =========================================
// Запуск уровня
// =========================================

function startLevel(levelIndex){

    app.className = "";

    if(!isLevelUnlocked(levelIndex)){

        showChapter(Engine.currentChapter);

        return;

    }

    loadLevel(

        Engine.currentBook,

        Engine.currentChapter,

        levelIndex

    );

    startQuiz();

    showQuestion();

}
// =========================================
// Вспомогательные функции
// =========================================

function openBook(){

    showBooks();

}

function openChapter(){

    showChapter(

        Engine.currentChapter

    );

}

function openTheory(){

    showTheory();

}

function restartLevel(){

    startQuiz();

    showQuestion();

}

function backToBooks(){

    showBooks();

}

function backToChapters(){

    showChapters(

        Engine.currentBook

    );

}
