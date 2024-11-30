



// Fonction pour sauvegarder les joueurs dans localStorage
export function saveToLocalStorage() {
  localStorage.setItem("players", JSON.stringify(players));
}