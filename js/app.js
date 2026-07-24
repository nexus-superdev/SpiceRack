const API_URL = "https://script.google.com/macros/s/AKfycbwuRjDpfQqEWOs2OvaFDkPEYYgmxELuQrElxCeOkIKo024HyQA-Sil4cLDzgOUlzaG9sg/exec";




function showLoading(){

  document.body.classList.add("loading");


  if(window.innerWidth <= 700){

    const container = document.getElementById("results");

    container.innerHTML = "";


    for(let i = 0; i < 9; i++){

        const card = document.createElement("div");

        card.className = "icon-card";

        container.appendChild(card);

    }
  }
}


function hideLoading(){ document.body.classList.remove("loading"); }

/*
async function search(){

  const input = document.getElementById("searchBox");

  const query = input.value.trim();

  if(!query){ return; }

  showLoading();

  try {

    const response = await fetch(

        API_URL +
        "?query=" +
        encodeURIComponent(query)

    );

    const results = await response.json();

    displayIcons(results);

  }

  catch(error){

      console.error(error);
      showMessage("An error occured during the search.");

  }

  finally{ hideLoading(); }
}
*/

function search(){

    const query =
        document
        .getElementById("searchBox")
        .value
        .trim();


    if(!query){
        return;
    }


    showLoading();


    const script =
        document.createElement("script");


    script.src =
        API_URL +
        "?query=" +
        encodeURIComponent(query) +
        "&callback=displayIcons";


    document.body.appendChild(script);

}




function displayIcons(results){

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
