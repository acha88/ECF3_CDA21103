function selectGame() {
  fetch("boardgames.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getGame(data.games);
    });
}

// fonction pour sélectionner un jeux dans une liste déroulante
function getGame(games) {
  games.map((game, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.innerText = game.title;
    document.getElementById("game").appendChild(option);
  });
}

// Vérifier le formulaire

// Récupération des éléments HTML
const form = document.querySelector("form");
const titleSelect = document.querySelector("#game");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");

// Fonction de vérification de la date
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  return true;
}

// Fonction de vérification du formulaire
function validateForm(event) {
  event.preventDefault();

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const today = new Date().toISOString().slice(0, 10);

  // Vérification de la validité des dates
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    alert("Sélectionner une date de début et une date de fin");
    return;
  }

  // Vérification de l'ordre chronologique des dates
  if (startDate > endDate) {
    alert("La date de fin doit être supérieure à la date de début.");
    return;
  }

  // Vérification de la date de début
  if (startDate < today) {
    alert("La date de début doit être supérieure à la date du jour.");
    return;
  }

  // Vérification de la durée de la réservation (maximum 7 jours)
  const oneDay = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée
  const startDateMs = new Date(startDate).getTime();
  const endDateMs = new Date(endDate).getTime();
  const durationMs = endDateMs - startDateMs;
  const durationDays = Math.ceil(durationMs / oneDay);
  if (durationDays > 7) {
    alert("La durée de la réservation ne doit pas dépasser 7 jours.");
    return;
  }

  // Envoi du formulaire
  form.submit();
}

// Écouteur d'événement sur la soumission du formulaire
form.addEventListener("submit", validateForm);
