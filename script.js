let afficher = document.getElementById("listGame");
let afficherDetail = document.getElementById("detailMore");

// AFFICHER LES JEUX SUR LA PAGE BOARDGAMES
function loadGame(result) {
  let infoGame = document.createElement("article");

  infoGame.innerHTML =
    '<div class="card"> <img src="' +
    result.image +
    '"><br><h3 class="gameName">' +
    result.title +
    "</h3><br><p>" +
    result.year +
    '</p><button class="btn_detail" value="Détail">Détail</button></div>';

  afficher.appendChild(infoGame);
  infoGame.addEventListener("click", (e) => {
    afficherDetail.innerHTML = "";
    detail(result);
  });
}

// AFFICHER LE DETAIL SUR LE COTER AU CLICK
function detail(data) {
  let info = document.createElement("div");
  info.innerHTML =
    '<div class="card_detail"><h2>POUR PLUS DE DETAILS...</h2><p> Titre : ' +
    data.title +
    "</p><p> Nombre de joueurs : " +
    data.players +
    "</p><p> Genre : " +
    data.genre +
    "</p><p> Résumé du jeu : " +
    data.info +
    '</p><br><a class="btn_reserv" href="forrow.html">Réserver</a></div>';

  afficherDetail.appendChild(info);
}

// CHARGER L'API ET LES FONCTIONS
fetch("https://api.npoint.io/33fe536f3a3bc2f018fb")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.games.map((game) => {
      loadGame(game);
    });
  });
