const API_URL = "https://script.google.com/macros/s/AKfycbwuRjDpfQqEWOs2OvaFDkPEYYgmxELuQrElxCeOkIKo024HyQA-Sil4cLDzgOUlzaG9sg/exec";

let clearResultsTimeout = null;


function showLoading(){

    document.body.classList.add("loading");

    const container = document.getElementById("results");

    const cards = container.querySelectorAll(".icon-card");

    cards.forEach(card => {
        card.classList.add("fade-out");
    });

    


    if(window.innerWidth <= 700){

        for(let i = 0; i < 9; i++){

            const card = document.createElement("div");

            card.className = "icon-card";

            container.appendChild(card);

        }

        return;
    }

    clearResultsTimeout = setTimeout(() => {
        container.innerHTML = "";
    }, 250);

    const button = document.getElementById("searchButton");
    const text = button.querySelector(".button-text");

    button.dataset.width = button.offsetWidth + "px";
    button.style.width = "160px";
    text.textContent = "Searching...";
    button.disabled = true;
}


function hideLoading(){

    document.body.classList.remove("loading");

    const button = document.getElementById("searchButton");
    const text = button.querySelector(".button-text");

    text.textContent = "Search";

    button.style.width = button.dataset.width;

    button.disabled = false;
}


function search(){

    console.log("SEARCH PARTITA");

    const query =
        document
        .getElementById("searchBox")
        .value
        .trim();

    if(!query){
        return;
    }

    showLoading();

    const script = document.createElement("script");

    script.src =
        API_URL +
        "?query=" +
        encodeURIComponent(query) +
        "&callback=displayIcons";

    script.onload = function(){

        script.remove();

    };

    script.onerror = function(){

        hideLoading();

        showMessage("Errore durante la ricerca.");

        script.remove();

    };

    document.body.appendChild(script);
}


function displayIcons(results){

    console.log("DISPLAY ICONS", results);

    if(clearResultsTimeout){
        clearTimeout(clearResultsTimeout);
        clearResultsTimeout = null;
    }

    const container = document.getElementById("results");

    container.innerHTML = "";

    hideLoading();

    results.forEach(icon => {

        const card = document.createElement("div");

        card.className = "icon-card";

        card.innerHTML = `
            <img src="${icon.url}">
            <div class="icon-name">
                ${icon.name}
            </div>
        `;

        card.addEventListener("click", function(){
            selectIcon(icon);
        });

        container.appendChild(card);

    });

}


function selectIcon(icon){

    showMessage("Selected Icon: " + icon.name);

}


function showMessage(text){

    const msg = document.getElementById("message");

    msg.textContent = text;

    msg.classList.add("visible");

    setTimeout(()=>{
        msg.classList.remove("visible");
    }, 2000);

}


document
.getElementById("searchBox")
.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){
            search();
        }

    }
);
