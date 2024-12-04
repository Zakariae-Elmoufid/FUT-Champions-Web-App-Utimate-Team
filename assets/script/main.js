const sections = document.querySelectorAll(".form-section");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playerType = document.getElementById("playerType");
const playerFields = document.getElementById("playerFields");
const goalkeeperFields = document.getElementById("goalkeeperFields");
let currentSection = 0;



let players = JSON.parse(localStorage.getItem("players")) || [];


function saveToLocalStorage() {
  localStorage.setItem("players", JSON.stringify(players));
}

function updateForm() {
  
  sections.forEach((section, index) => {
    if (index === currentSection) {
      section.classList.remove("hidden");
    }else {
      section.classList.add("hidden");
    }
  });

  if (currentSection === 2) {
    if (playerType.value === "player") {
      playerFields.classList.remove("hidden");
      goalkeeperFields.classList.add("hidden");
      currentSection++;
      document.getElementById("diving").value = '10';
      document.getElementById("handling").value = '10';
      document.getElementById("reflexes").value = '10';
      nextBtn.textContent = "Submit" 
    } else if (playerType.value === "goalkeeper") {
      goalkeeperFields.classList.remove("hidden");
      playerFields.classList.add("hidden");
      document.getElementById("playerPosition").value = 'gk';
      document.getElementById("pace").value = '10';
      document.getElementById("shooting").value ='10';
      document.getElementById("dribbling").value = '10';
      document.getElementById("defending").value = '10';
      document.getElementById("physical").value = '10';
      nextBtn.textContent = "Submit" ;
      }
  }else if (currentSection === 3){
    goalkeeperFields.classList.add("hidden");
    playerFields.classList.add("hidden");
    
  }

  
  if (currentSection === 0) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }
 
}

function validateInput() {
  const inputs = sections[currentSection].querySelectorAll("input, select");

  let isValid = true;
 
    inputs.forEach((input) => {

      if (input.value.trim() === "") {
        input.classList.add("error");

        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error-message")) {
          const error = document.createElement("span");
          error.textContent = `${input.previousElementSibling.textContent} is required`;
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

      if (input.type === "number") {
        const value = input.value;
        if (value < 10 || value > 99) {
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
  
  return isValid;
}


prevBtn.addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection--;
    updateForm();
    if (playerType.value === "player" && currentSection === 3) {
      currentSection-=2;
      updateForm();
    }
  }
});

nextBtn.addEventListener("click", () => {
  if (validateInput()) {
    if (currentSection < sections.length - 2) {
      currentSection++;
      updateForm();
    } else {
      saveData();
      currentSection = 0;
      updateForm();
      document.getElementById("paginatedForm").reset();
      alert("secuse");
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
    
    }
  });

}

function generatePlayer(item) {
  return `
    <div class ="icons">
    <i class='bx bx-revision add' data-id="${item.id}" data-position="${item.position}"  onclick="changePlayers(this)" ></i>
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
    <i class='bx bx-revision add'   data-id="${item.id}" data-position="${item.position}"  onclick="changePlayers(this)" ></i>
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

function modalGoal(item ) {
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

function modalPlayer(item){
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
      <img src="${item.logo}" alt="Club">
    </div>
  `;
}

function remplacement(item) {
  const replacement = document.getElementById('replacement');
  let myDiv = document.createElement('div');
  
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
  players = players.filter(player => player.id !== id );
  saveToLocalStorage();
  location.reload()
}

function changePlayers(element) {

  const  id = parseInt(element.getAttribute("data-id"));
  const position = element.getAttribute("data-position");
 

  const playerOnField = players.find(player => player.id === id);
  const replacementPlayers = players.filter(player =>  player.position === position && player.id !== id);
 
  
  const changeContainer = document.getElementById('change');
  const changePlayer = document.getElementById('change-player');
  const mark = document.getElementById("mark");


  changePlayer.classList.remove('hidden');
  

 
  replacementPlayers.forEach(replacement => {
      const playerDiv = document.createElement('div');
      playerDiv.classList.add('cart');
      playerDiv.setAttribute("id",`${replacement.position}`);
      
      playerDiv.innerHTML = replacement.position === "gk"  ? modalGoal(replacement) : modalPlayer(replacement);
      
      const confirmButton = document.createElement('i');
      confirmButton.classList.add('bx', 'bx-check', 'check');   

         confirmButton.addEventListener('click', () => {
          confirmReplacement(playerOnField.id, replacement.id);
          changePlayer.classList.add('hidden'); 
        });
        playerDiv.appendChild(confirmButton);
        changeContainer.appendChild(playerDiv);
        mark.addEventListener('click', () => {
          changeContainer.removeChild(playerDiv);
          changePlayer.classList.add('hidden');
        });
    });
    mark.addEventListener('click', () => {
      changePlayer.classList.add('hidden');
    });
    
    
      

}

function confirmReplacement(playerId, replacementId) { 
  const playerOnField = players.find(player => player.id === playerId);

  const replacementPlayer = players.find(player => player.id === replacementId);



  if (playerOnField && replacementPlayer) {
  
    const swap = { ...playerOnField }; 
    
    ;
    Object.keys(playerOnField).forEach(key => {
        playerOnField[key] = replacementPlayer[key];
    });

    Object.keys(replacementPlayer).forEach(key => {
        replacementPlayer[key] = swap[key];
    });


 
    saveToLocalStorage();
    location.reload()

    alert("Le joueur a été remplacé avec succès !");

  } else {
      console.error("Joueur ou remplaçant introuvable !");
  }
}

function editPlayer(id) {
  const playerToEdit = players.find(player => player.id === id);

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

  let saveBtn = document.getElementById("savechange");
  saveBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  saveBtn.addEventListener("click" , () => {
    if (validateInput()) {
      if (currentSection < sections.length - 2) {
        currentSection++;
        updateForm();
      } else {
        saveChanges(id);
      }
    }
  })



}

function saveChanges(id) {

  const updatedPlayer = {
    id: id, 
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

  players = players.map(player => player.id === id ? updatedPlayer : player);

  saveToLocalStorage();

  document.getElementById("paginatedForm").reset();
  currentSection = 0;
  updateForm();
  
  
  alert("Player updated successfully!");
  location.reload()
}


document.addEventListener("DOMContentLoaded", () => {
  displayPlayers(players);
  });

 

