const sections = document.querySelectorAll(".form-section");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playerType = document.getElementById("playerType");
const playerFields = document.getElementById("playerFields");
const goalkeeperFields = document.getElementById("goalkeeperFields");
let currentSection = 0;

let players = JSON.parse(localStorage.getItem("players")) || [];

// Fonction pour sauvegarder les joueurs dans localStorage
function saveToLocalStorage() {
  localStorage.setItem("players", JSON.stringify(players));
}

function updateForm() {
  // Afficher la section actuelle
  sections.forEach((section, index) => {
    if (index === currentSection) {
      section.classList.remove("hidden");
    }
    if (index !== currentSection) {
      section.classList.add("hidden");
    }
  });

  // Montrer ou cacher les champs spécifiques uniquement à la dernière section
  if (currentSection === 2) {
    if (playerType.value === "player") {
      playerFields.classList.remove("hidden");
      goalkeeperFields.classList.add("hidden");
    } else if (playerType.value === "goalkeeper") {
      goalkeeperFields.classList.remove("hidden");
      playerFields.classList.add("hidden");
    }
  }

  // Update button states
  if (currentSection === 0) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }
  nextBtn.textContent =
    currentSection === sections.length - 2 ? "Submit" : "Next";
}

function validateInput() {
  const inputs = sections[currentSection].querySelectorAll("input, select");

  let isValid = true;

  console.log(currentSection);

  if (currentSection < 2) {
    inputs.forEach((input) => {
      const errorMessage = input.nextElementSibling;

      if (input.value.trim() === "") {
        input.classList.add("error");

        if (
          !errorMessage ||
          !errorMessage.classList.contains("error-message")
        ) {
          const error = document.createElement("span");
          error.textContent = `${input.previousElementSibling.textContent} is required`;
          error.classList.add("error-message");
          input.parentNode.appendChild(error);
        }

        isValid = false;
      } else {
        input.classList.remove("error");

        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.remove();
        }
      }

      if (input.type === "number") {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < 10 || value > 99) {
          input.classList.add("error");

          if (
            !input.nextElementSibling ||
            !input.nextElementSibling.classList.contains("error-message")
          ) {
            const error = document.createElement("span");
            error.textContent = "Please enter a valid number (10-99).";
            error.classList.add("error-message");
            input.parentNode.appendChild(error);
          }

          isValid = false;
        } else {
          input.classList.remove("error");

          if (
            input.nextElementSibling &&
            input.nextElementSibling.classList.contains("error-message")
          ) {
            input.nextElementSibling.remove();
          }
        }
      }
    });
  }
  return isValid;
}

prevBtn.addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection--;
    updateForm();
  }
});

nextBtn.addEventListener("click", () => {
  if (validateInput()) {
    if (currentSection < sections.length - 2) {
      currentSection++;
      updateForm();
    } else {
      saveData();
      alert("Form submitted!");
      document.getElementById("paginatedForm").reset();
      currentSection = 0;
      updateForm();
    }
  }
});

playerType.addEventListener("change", updateForm);
updateForm();

function saveData() {

  // Section 1
  const nameValue = document.getElementById("name").value;
  const photoValue = document.getElementById("photo").value;
  const nationalityValue = document.getElementById("nationality").value;
  const flagValue = document.getElementById("flag").value;

  // Section 2
  const clubValue = document.getElementById("club").value;
  const logoValue = document.getElementById("logo").value;
  const ratingValue = document.getElementById("rating").value;
  const typePlayerValue = document.getElementById("playerType").value;
  // Section 3 (Player-specific)
  const playerPositionValue = document.getElementById("playerPosition").value;
  const paceValue = document.getElementById("pace").value;
  const shootingValue = document.getElementById("shooting").value;
  const dribblingValue = document.getElementById("dribbling").value;
  const defendingValue = document.getElementById("defending").value;
  const physicalValue = document.getElementById("physical").value;


  // Section 3 (Goalkeeper-specific)
  const divingValue = document.getElementById("diving").value;
  const handlingValue = document.getElementById("handling").value;
  const reflexesValue = document.getElementById("reflexes").value;

  // Afficher les valeurs dans la console pour vérification

  
  let player = {
    id: Date.now(),
    name: nameValue,
    photo: photoValue,
    nationality: nationalityValue,
    flag: flagValue,
    club: clubValue,
    logo: logoValue,
    rating: ratingValue,
    typePlayer: typePlayerValue,
    position: playerPositionValue,
    pace: paceValue,
    shooting: shootingValue,
    dribbling: dribblingValue,
    defending: defendingValue,
    diving: divingValue,
    handling: handlingValue,
    reflexes: reflexesValue,
    physical: physicalValue,
  };
   
  players.push(player);
  saveToLocalStorage();
  displayPlayers([player]);

}

function displayPlayers(players){

  const LW = document.getElementById('LW');
  const ST = document.getElementById('ST');
  const RW = document.getElementById('RW');
  const CDM = document.getElementById('CDM');
  const CM = document.getElementById('CM');
  const CAM = document.getElementById('CAM');
  const LB = document.getElementById('LB');
  const CBR = document.getElementById('CBR');
  const CBL = document.getElementById('CBL');
  const RB = document.getElementById('RB');
  const GK = document.getElementById('GK');

   console.log(players);

  players.forEach((item) => {
    if (item.position === "gk" ) {
      if(!GK.classList.contains("exest")){
        GK.classList.add("exest")
        GK.innerHTML = generateGoal(item);
      }else{
        remplacement(item);
      }
      
    }  else if (item.position === "LB") {
      if(!LB.classList.contains("exest")){
        LB.innerHTML = generatePlayer(item);
        LB.classList.add("exest")
      }else{
        remplacement(item);
      }    
    }
    else if (item.position === "CBL") {
      if(!CBL.classList.contains("exest")){
        CBL.innerHTML = generatePlayer(item);
        CBL.classList.add("exest")
      }else{
        remplacement(item);
      }
    } else if (item.position === "CBR") {
      if(!CBR.classList.contains("exest")){
        CBR.innerHTML = generatePlayer(item);
        CBR.classList.add("exest")
      }else{
        remplacement(item);
      } 
    } else if (item.position === "RB") {
      if(!RB.classList.contains("exest")){
        RB.innerHTML = generatePlayer(item);
        RB.classList.add("exest")
      }else{
        remplacement(item);
      }
    } else if (item.position === "CDM") {
      if(!CDM.classList.contains("exest")){
        CDM.innerHTML = generatePlayer(item);
        CDM.classList.add("exest")
      }else{
        remplacement(item);
      }    
    } else if (item.position === "CM") {
      if(!CM.classList.contains("exest")){
        CM.innerHTML = generatePlayer(item);
        CM.classList.add("exest")
      }else{
        remplacement(item);
      }    
    } else if (item.position === "CAM") {
      if(!CAM.classList.contains("exest")){
        CAM.innerHTML = generatePlayer(item);
        CAM.classList.add("exest")
      }else{
        remplacement(item);
      }    
    } else if (item.position === "LW") {
      if(!LW.classList.contains("exest")){
        LW.innerHTML = generatePlayer(item);
        LW.classList.add("exest")
      }else{
        remplacement(item);
      }    
    } else if (item.position === "ST") {
      if(!ST.classList.contains("exest")){
        ST.innerHTML = generatePlayer(item);
        ST.classList.add("exest")
      }else{
        remplacement(item);
      }    
    } else if (item.position === "RW") {
      if(!RW.classList.contains("exest")){
        RW.innerHTML = generatePlayer(item);
        RW.classList.add("exest")
      }else{
        remplacement(item);
      }    
    
    } else {
      console.log("hello world");
    }
  });
}

function generatePlayer(item) {
  return `
    <div class="top-section">
      <div>
        <div class="rating">${item.rating}</div>
        <div class="nationality">${item.nationality}</div>
      </div>
      
      <!-- Image du joueur -->
      <div class="player-img">
        <img src="${item.photo}" alt="${item.name}">
      </div>
    </div>
    
    <!-- Nom du joueur -->
    <div class="name">${item.name}</div>
    
    <!-- Statistiques -->
    <div class="stats">
      <div class="stat">
        <span class="stat-title">DRI</span>
        <span class="stat-value">${item.dribbling}</span>
      </div>
      <div class="stat">
        <span class="stat-title">DEF</span>
        <span class="stat-value">${item.defending}</span>
      </div>
      <div class="stat">
        <span class="stat-title">PHY</span>
        <span class="stat-value">${item.physical}</span>
      </div>
      <div class="stat">
        <span class="stat-title">PAC</span>
        <span class="stat-value">${item.pace}</span>
      </div>
      <div class="stat">
        <span class="stat-title">SHOT</span>
        <span class="stat-value">${item.shooting}</span>
      </div>
    </div>
    
    <!-- Drapeau et club -->
    <div class="bottom-section">
      <img src="${item.flag}" alt="Flag" class="icon">
      <img src="${item.club}" alt="Club">
    </div>
  `;
}

function generateGoal(item) {
  return `
    <i class='delet bx bxs-trash' onclick="removePlayer(${item.id})"></i>
    <div class="top-section">
      <div>
        <div class="rating">${item.rating}</div>
        <div class="nationality">${item.nationality}</div>
      </div>
      
      <!-- Image du joueur -->
      <div class="player-img">
        <img src="${item.photo}" alt="${item.name}">
      </div>
    </div>
    
    <!-- Nom du joueur -->
    <div class="name">${item.name}</div>
    
    <!-- Statistiques -->
    <div class="stats">
      <div class="stat">
        <span class="stat-title">hand</span>
        <span class="stat-value">${item.handling}</span>
      </div>
      <div class="stat">
        <span class="stat-title">ref</span>
        <span class="stat-value">${item.reflexes}</span>
      </div>
      <div class="stat">
        <span class="stat-title">div</span>
        <span class="stat-value">${item.diving}</span>
      </div>
      
    </div>
    
    <!-- Drapeau et club -->
    <div class="bottom-section">
      <img src="${item.flag}" alt="Flag" class="icon">
      <img src="${item.club}" alt="Club">
    </div>
  `;
}

function remplacement(item) {
  const replacement = document.getElementById('replacement');
  let myDiv =document.createElement('div');
        myDiv.classList.add('cart');
        myDiv.innerHTML = generateGoal(item);
        let idPositition = item.position;
        console.log(idPositition);
        myDiv.setAttribute("id",`${item.position}`)
        replacement.appendChild(myDiv); 
        return replacement;
}

function removePlayer(id){
  players = players.filter(player => player.id !== id);

  // Sauvegarder les modifications dans localStorage
  saveToLocalStorage();
  location.reload()
}

document.addEventListener("DOMContentLoaded", () => {
  displayPlayers(players);
});