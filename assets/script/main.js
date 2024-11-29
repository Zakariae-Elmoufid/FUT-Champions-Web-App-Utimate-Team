
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
      saveChanges();
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
    <div class ="icons">
     <i class='bx bx-revision add' id="add" data-position="${item.position}" data-id="${item.id}" onclick="handleClick(this)" ></i>
    <i class='delet bx bxs-trash' onclick="removePlayer(${item.id})"></i>
    <i class='bx bxs-pencil up-date'  onclick="editPlayer(${item.id})"></i>
    </div>
     
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
      <img src="${item.logo}" alt="Club">
    </div>
  `;
}

function generateGoal(item) {
  return `
   <div class ="icons">
     <i class='bx bx-revision add' id="add" data-position="${item.position}" data-id="${item.id}" onclick="handleClick(this)" ></i>
    <i class='delet bx bxs-trash' onclick="removePlayer(${item.id})"></i>
    <i class='bx bxs-pencil up-date' onclick="editPlayer(${item.id})" ></i>
    </div>
    
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
      <img src="${item.flag}" alt="Flag" >
      <img src="${item.logo}" alt="Club">
    </div>
  `;
}

function modalGoal(item, ) {
  console.log("hello");
  console.log(item);
  console.log(playerOnField);
  console.log(replacement);
  return `
  <div class ="icons">
    <i class='bx bx-revision add' id="add"  ></i>
   </div>
   
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
     <img src="${item.flag}" alt="Flag" >
     <img src="${item.logo}" alt="Club">
   </div>
 `;
}

function modalplayer(item){
  return `
    <div class ="icons">
     <i class='bx bx-revision add' id="add"  ></i>

    </div>
     
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
      <img src="${item.logo}" alt="Club">
    </div>
  `;
}

function remplacement(item) {
  const replacement = document.getElementById('replacement');
  let myDiv =document.createElement('div');
  
  myDiv.classList.add('cart');
        if(item.position === "gk"){
        myDiv.innerHTML = generateGoal(item);
        }else{
          myDiv.innerHTML = generatePlayer(item);
        }
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

function handleClick(element) {
  const position = element.getAttribute('data-position');
  const id = parseInt(element.getAttribute('data-id'),10) 
  changePlayers(position, id);
}



function changePlayers(position, id) {
  const playerOnField = players.find(player => player.id === id);
 
  const cartChange = document.getElementById('cart-change');
  const creatbutton = document.createElement('button');
  creatbutton.textContent = "confirm"; 
  cartChange.appendChild(creatbutton);

  const replacementPlayers = players.filter(player => player.position === position && player.id !== id);
  
  const changeContainer = document.getElementById('change');
  const changePlayer = document.getElementById('change-player');
  changePlayer.classList.remove('hidden');
  
  changeContainer.innerHTML = '';
  
  replacementPlayers.forEach(replacement => {
    // const playerDiv = document.createElement('div');
    // playerDiv.classList.add('cart');
    if(replacement.position === "gk"){
      cartChange.innerHTML = generateGoal(replacement,playerOnField.id,replacement.id);
    }else{
      cartChange.innerHTML = generatePlayer(replacement,playerOnField.id,replacement.id);
    }
    
    changeContainer.appendChild(cartChange);


    changeBtn.addEventListener('click', () => {
         confirmReplacement(playerOnField, replacement)
    })    
  });

  let  mark = document.getElementById("mark");
  mark.addEventListener('click' , () => {
       changePlayer.classList.add('hidden');
  })
}

function confirmReplacement(playerId, replacementId) {
  const playerOnField = players.find(player => player.id === playerId);
  const replacementPlayer = players.find(player => player.id === replacementId);

  if (playerOnField && replacementPlayer) {
    // Échanger les positions
    const tempPosition = playerOnField.position;
    playerOnField.position = replacementPlayer.position;
    replacementPlayer.position = tempPosition;

    // Mettre à jour le localStorage
    saveToLocalStorage();

    // Réactualiser l'affichage
    displayPlayers(players);

    alert("Le joueur a été remplacé avec succès !");
  } else {
    console.error("Joueur ou remplaçant introuvable !");
  }
}





function editPlayer(id) {
  // Trouver le joueur à modifier
  const playerToEdit = players.find(player => player.id === id);
  
  if (!playerToEdit) {
    alert("Player not found!");
    return;
  }

  // Pré-remplir le formulaire avec les données du joueur
  document.getElementById("name").value = playerToEdit.name || '';
  document.getElementById("photo").value = playerToEdit.photo || '';
  document.getElementById("nationality").value = playerToEdit.nationality || '';
  document.getElementById("flag").value = playerToEdit.flag || '';
  document.getElementById("club").value = playerToEdit.club || '';
  document.getElementById("logo").value = playerToEdit.logo || '';
  document.getElementById("rating").value = playerToEdit.rating || '';
  document.getElementById("playerType").value = playerToEdit.typePlayer || '';
  document.getElementById("playerPosition").value = playerToEdit.position || '';
  document.getElementById("pace").value = playerToEdit.pace || '';
  document.getElementById("shooting").value = playerToEdit.shooting || '';
  document.getElementById("dribbling").value = playerToEdit.dribbling || '';
  document.getElementById("defending").value = playerToEdit.defending || '';
  document.getElementById("physical").value = playerToEdit.physical || '';
  document.getElementById("diving").value = playerToEdit.diving || '';
  document.getElementById("handling").value = playerToEdit.handling || '';
  document.getElementById("reflexes").value = playerToEdit.reflexes || '';

  // Afficher la section appropriée si nécessaire
  if (playerToEdit.typePlayer === "player") {
    playerFields.classList.remove("hidden");
    goalkeeperFields.classList.add("hidden");
  } else {
    playerFields.classList.add("hidden");
    goalkeeperFields.classList.remove("hidden");
  }

  // Mettre à jour le bouton Submit pour qu'il gère la modification
  nextBtn.textContent = "Save Changes";
  nextBtn.onclick = () => saveChanges(id);
}

function saveChanges(id) {
  // Récupérer les nouvelles valeurs du formulaire
  const updatedPlayer = {
    id: id, // Garder le même ID
    name: document.getElementById("name").value,
    photo: document.getElementById("photo").value,
    nationality: document.getElementById("nationality").value,
    flag: document.getElementById("flag").value,
    club: document.getElementById("club").value,
    logo: document.getElementById("logo").value,
    rating: document.getElementById("rating").value,
    typePlayer: document.getElementById("playerType").value,
    position: document.getElementById("playerPosition").value,
    pace: document.getElementById("pace").value,
    shooting: document.getElementById("shooting").value,
    dribbling: document.getElementById("dribbling").value,
    defending: document.getElementById("defending").value,
    physical: document.getElementById("physical").value,
    diving: document.getElementById("diving").value,
    handling: document.getElementById("handling").value,
    reflexes: document.getElementById("reflexes").value,
  };

  // Mettre à jour le joueur dans la liste
  players = players.map(player => player.id === id ? updatedPlayer : player);

  // Sauvegarder les changements
  saveToLocalStorage();

  // Réinitialiser le formulaire
  document.getElementById("paginatedForm").reset();
  currentSection = 0;
  updateForm();
  
  
  alert("Player updated successfully!");
  location.reload()
}




document.addEventListener("DOMContentLoaded", () => {
  displayPlayers(players);
  });