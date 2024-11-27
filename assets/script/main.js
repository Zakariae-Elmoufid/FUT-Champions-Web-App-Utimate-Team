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



prevBtn.addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection--;
    updateForm();
  }
});

nextBtn.addEventListener("click", () => {
  if (validateInput()) {
    if (currentSection < sections.length-2 ) {
      currentSection++;
      updateForm();
    } else {
      alert("Form submitted!");
      document.getElementById("paginatedForm").reset();
      currentSection = 0;
      updateForm();
    }
  }
});

playerType.addEventListener("change", updateForm);
updateForm();

function validateInput() {
  const inputs = sections[currentSection].querySelectorAll("input, select");

  
   
  let isValid = true; 
   
  console.log(currentSection);
  
  if(currentSection<2){
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



