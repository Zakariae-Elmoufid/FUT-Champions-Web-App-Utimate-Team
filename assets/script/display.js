// import { players } from "./localStorge";
 


 export function displayPlayers(players) {

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
  