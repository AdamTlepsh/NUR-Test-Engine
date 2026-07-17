// =========================================
// NUR Test Engine
// chapter_tahara.js
// Учебный блок №1
// =========================================

const CHAPTER_TAHARA = {

    id: "tahara",

    title: "Очищение",

    description: "Учебный блок №1",

    readTime: 180,

    theory: THEORY_TAHARA,

    levels: [

        LEVEL1_TAHARA,

        LEVEL2_TAHARA,

        LEVEL3_TAHARA

    ]

};

// =========================================
// Вспомогательные функции
// =========================================

function getTheory(chapter){

    return chapter.theory;

}

function getLevel(chapter, level){

    return chapter.levels[level];

}