const sections = document.querySelectorAll(".form-section");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playerType = document.getElementById("playerType");
const playerFields = document.getElementById("playerFields");
const goalkeeperFields = document.getElementById("goalkeeperFields");
let currentSection = 0;

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

        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
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

          if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error-message")) {
            const error = document.createElement("span");
            error.textContent = "Please enter a valid number (10-99).";
            error.classList.add("error-message");
            input.parentNode.appendChild(error);
          }

          isValid = false;
        } else {
          input.classList.remove("error");

          if (input.nextElementSibling && input.nextElementSibling.classList.contains("error-message")) {
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
  const photoValue = document.getElementById("photo").value
  const nationalityValue = document.getElementById("nationality").value;
  const flagValue = document.getElementById("flag").value;

  // Section 2
  const clubValue = document.getElementById("club").value;
  const logoValue = document.getElementById("logo").value
  const ratingValue = document.getElementById("rating").value;
  const typePlayerValue = document.getElementById("playerType").value;

  // Section 3 (Player-specific)
  const playerPositionValue = document.getElementById("playerPosition").value;
  const paceValue = document.getElementById("pace").value;
  const shootingValue = document.getElementById("shooting").value;
  const dribblingValue = document.getElementById("dribbling").value;
  const defendingValue = document.getElementById("defending").value;
  const physicalValue = document.getElementById('physical').value;

  // Section 3 (Goalkeeper-specific)
  const divingValue = document.getElementById("diving").value;
  const handlingValue = document.getElementById("handling").value;
  const reflexesValue = document.getElementById("reflexes").value;

  // Afficher les valeurs dans la console pour vérification


  let saveData = document.getElementById('save');



  let players = [];

  let player = {
    name: nameValue,
    photo: photoValue,
    nationality: nationalityValue,
    flag: flagValue,
    club: clubValue,
    logo: logoValue,
    rating: ratingValue,
    typePlayer: typePlayerValue,
    playerPosition: playerPositionValue,
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
  console.log(player);


  const LW = document.querySelectorAll('[data-position="LW"]');
  const ST = document.querySelectorAll('[data-position="ST"]');
  const RW = document.querySelectorAll('[data-position="RW"]');
  const CDM = document.querySelectorAll('[data-position="CDM"]');
  const CM = document.querySelectorAll('[data-position="CM"]');
  const CAM = document.querySelectorAll('[data-position="CAM"]');
  const LB = document.querySelectorAll('[data-position="LB"]');
  const CBR = document.querySelectorAll('[data-position="CBR"]');
  const CBL = document.querySelectorAll('[data-position="CBL"]');
  const RB = document.querySelectorAll('[data-position="RB"]');
  const GK = document.querySelectorAll('[data-position="GK"]');


  players.forEach(item => {
    if (item.playerPosition === "left-back") {
      LB.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if (item.playerPosition === "center-back-left") {
      CBL.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if (item.playerPosition === "left-back-right") {
      CBR.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if (item.playerPosition === "right-back") {
      RB.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });

    } else if (item.playerPosition === "defensive-midfielder") {
      CDM.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if (item.playerPosition === "center-midfielder") {
      CM.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      }); 
    } else if (item.playerPosition === "attacking-midfielder") {
      CAM.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if(item.playerPosition === "left-winger") {
      LW.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if (item.playerPosition === "center-forward") {
      ST.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else if (item.playerPosition === "right-winger") {
      RW.forEach(element => {
        element.innerHTML = generatePlayerCard(item);
      });
    } else {
      GK.forEach(element => {
        element.innerHTML = generateGoalCard(item);
      });
    }
  })
    
  
  


}

function generatePlayerCard(item) {
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

function generateGoalCard(item) {
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
        <span class="stat-value">${item.handling}</span>
      </div>
      <div class="stat">
        <span class="stat-title">DEF</span>
        <span class="stat-value">${item.reflexes}</span>
      </div>
      <div class="stat">
        <span class="stat-title">PHY</span>
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

// Exemple d'utilisation de la fonction
function renderPlayers(players, targetElements) {
  players.forEach(item => {
    targetElements.forEach(element => {
      element.innerHTML = generatePlayerCard(item);
    });
  });
}




