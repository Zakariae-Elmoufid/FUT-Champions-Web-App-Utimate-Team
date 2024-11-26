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
      section.classList.remove("hidden"); // Affiche la section active
    }
    if (index !== currentSection) {
      section.classList.add("hidden"); // Cache les autres sections
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
    currentSection === sections.length - 1 ? "Submit" : "Next";
}

prevBtn.addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection--;
    updateForm();
  }
});

nextBtn.addEventListener("click", () => {
  if (validateInput()) {
    if (currentSection < sections.length - 1) {
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
  const sectionInput = currentSection;
  console.log(sectionInput);

  let isValid = false;

  if (sectionInput < 2) {
    inputs.forEach((input) => {
      input.nextElementSibling;

      if (input.value === "") {
        input.classList.add("error");

        if (
          !input.nextElementSibling ||
          !input.nextElementSibling.classList.contains("error-message")
        ) {
          const error = document.createElement("span");
          error.textContent = `${input.previousElementSibling.textContent} is required`;
          error.classList.add("error-message");
          input.parentNode.appendChild(error);
        }

        isValid = false;
      } else {
          isValid = true;
        input.classList.remove("error");
        if (
          input.nextElementSibling &&
          input.nextElementSibling.classList.contains("error-message")
        ) {
          input.nextElementSibling.remove();
        }
      }
      
    });
  }


  return isValid;
}
