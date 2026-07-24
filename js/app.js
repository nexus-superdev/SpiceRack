const API_URL = "https://script.google.com/macros/s/AKfycbwuRjDpfQqEWOs2OvaFDkPEYYgmxELuQrElxCeOkIKo024HyQA-Sil4cLDzgOUlzaG9sg/exec";


let loadingInterval;


function showLoading(){

    const button = document.querySelector(".search-button");

    button.dataset.text = button.innerHTML;
    button.dataset.width = button.offsetWidth + "px";
    button.style.width = "160px";

    button.innerHTML =
    `
    <span class="loading-text">Searching</span><span class="loading-dots"></span>
    `;
    
    const dots = button.querySelector(".loading-dots");
    
    let count = 0;
    
    loadingInterval = setInterval(()=>{
    
        count = (count + 1) % 4;
    
        dots.textContent = ".".repeat(count);
    
    },400);


    button.disabled = true;
}


function hideLoading(){

    clearInterval(loadingInterval);

    const button = document.querySelector(".search-button");

    button.innerHTML = button.dataset.text;

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

    if(!query){ return; }

    showLoading();

    const script = document.createElement("script");

    script.src =
        API_URL +
        "?query=" +
        encodeURIComponent(query) +
        "&callback=displayIcons";

    script.onload = function(){

        // Lo script è stato caricato.
        // hideLoading() verrà chiamata da displayIcons().

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
  hideLoading();  
    
  const container = document.getElementById("results");

  container.innerHTML = "";

  results.forEach(icon => {

    const card = document.createElement("div");

    card.className = "icon-card";

    card.innerHTML = `

        <img src="${icon.url}">

        <div class="icon-name">

            ${icon.name}

        </div>

    `;

    card.onclick = function(){ selectIcon(icon); };

    container.appendChild(card);
  });
}


function selectIcon(icon){ showMessage("Selected Icon: " + icon.name); }


function showMessage(text){

  const msg = document.getElementById("message");

  msg.textContent = text;

  msg.classList.add("visible");

  setTimeout(()=>{ msg.classList.remove("visible"); },2000);
}


document
.getElementById("searchBox")
.addEventListener(
    "keydown",
    function(event){
      if(event.key === "Enter"){ search(); }
    }
);
