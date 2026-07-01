// =========================================
// NUR Test Engine
// result.js
// Версия 1.0
// =========================================

// =========================================
// Экран результата
// =========================================

function showResult(){

    const result = getResult();

    app.innerHTML = "";

    // -------------------------

    const title = document.createElement("h1");

    title.innerHTML = "Результат";

    app.appendChild(title);

    // -------------------------

    const score = document.createElement("h2");

    score.innerHTML =

        result.score +

        " / " +

        result.total +

        " (" +

        result.percent +

        "%)";

    app.appendChild(score);

    // -------------------------

    if(result.errors.length===0){

        const ok=document.createElement("h3");

        ok.className="good";

        ok.innerHTML="🎉 Без ошибок!";

        app.appendChild(ok);

    }
    else{

        const titleErrors=document.createElement("h3");

        titleErrors.innerHTML="Ошибки";

        app.appendChild(titleErrors);

        result.errors.forEach(error=>{

            const block=document.createElement("div");

            block.className="o";

            block.style.marginBottom="15px";

            block.innerHTML=

            "<b>"+error.question+"</b><br><br>"+

            "Ваш ответ:<br>"+

            "<span style='color:red'>"+

            error.user+

            "</span><br><br>"+

            "Правильный ответ:<br>"+

            "<span style='color:green'>"+

            error.correct+

            "</span>";

            app.appendChild(block);

        });

    }

    // -------------------------

    const again=document.createElement("button");

    again.innerHTML="Пройти ещё раз";

    again.onclick=function(){

        showStart();

    };

    app.appendChild(again);

    // -------------------------

    const home=document.createElement("button");

    home.style.marginLeft="10px";

    home.innerHTML="Главное меню";

    home.onclick=function(){

        showBooks();

    };

    app.appendChild(home);

}