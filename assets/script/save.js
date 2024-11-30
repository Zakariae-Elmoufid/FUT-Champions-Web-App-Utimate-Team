import { displayPlayers } from "./display";
import { players , saveToLocalStorage } from "./localStorge";

export let players = JSON.parse(localStorage.getItem("players")) || [];

export function saveData() {

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