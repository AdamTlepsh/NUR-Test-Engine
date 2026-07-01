// =========================================
// NUR Test Engine
// quiz.js
// Версия 2.0
// =========================================

// =========================================
// Показ вопроса
// =========================================

function showQuestion(){

    if(!hasNextQuestion()){

        showResult();

        return;

    }

    const question = getQuestion();

    app.innerHTML = `
        <h3>Вопрос ${Engine.index + 1}/${Engine.questions.length}</h3>

        <h2>${question.q}</h2>

        <div id="o"></div>
    `;

    let container = document.getElementById("o");

    question.a.forEach(answer=>{

        let d = document.createElement("div");

        d.className = "o";

        d.textContent = answer;

        d.onclick = function(){

            checkAnswer(d,answer);

        };

        container.appendChild(d);

    });

}

// =========================================
// Проверка ответа
// =========================================

function checkAnswer(element,userAnswer){

    const result = answer(userAnswer);

    document
        .querySelectorAll(".o")
        .forEach(x=>x.onclick=null);

    if(result.correct){

        element.classList.add("good");

        setTimeout(function(){

            showQuestion();

        },700);

    }
    else{

        element.classList.add("bad");

        document
            .querySelectorAll(".o")
            .forEach(card=>{

                if(card.textContent===result.answer){

                    card.classList.add("good");

                }

            });

        setTimeout(function(){

            showQuestion();

        },2000);

    }

}