const sections = document.querySelectorAll('.form-section');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playerType = document.getElementById('playerType');
const playerFields = document.getElementById('playerFields');
const goalkeeperFields = document.getElementById('goalkeeperFields');
let currentSection = 0;

function updateForm() {


    // Afficher la section actuelle
    sections.forEach((section, index) => {
if (index === currentSection) {
section.classList.remove('hidden'); // Affiche la section active
} else {
section.classList.add('hidden'); // Cache les autres sections
}
});

    // Montrer ou cacher les champs spécifiques uniquement à la dernière section
    if (currentSection === 3) {
        if (playerType.value === 'player') {
            playerFields.classList.remove('hidden');
            goalkeeperFields.classList.add('hidden');
        } else if (playerType.value === 'goalkeeper') {
            goalkeeperFields.classList.remove('hidden');
            playerFields.classList.add('hidden');
        }
    } else {
        // Toujours masquer les champs spécifiques dans les autres étapes
        playerFields.classList.add('hidden');
        goalkeeperFields.classList.add('hidden');
    }



    // Update button states
    if (currentSection === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    nextBtn.textContent = currentSection === sections.length - 1 ? 'Submit' : 'Next';
}

prevBtn.addEventListener('click', () => {
    if (currentSection > 0) {
        currentSection--;
        updateForm();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSection < sections.length - 1) {
        currentSection++;
        updateForm();
    } else {
        alert('Form submitted!');
        document.getElementById('paginatedForm').reset();
        currentSection = 0;
        updateForm();
    }
});

playerType.addEventListener('change', updateForm);
updateForm(); // Initialize form display