const titre = document.querySelector(".hero h1");
if (titre) titre.textContent = "Trouve un logement dans le Grand Tunis";

const surtitre = document.querySelector(".hero .surtitre");
if (surtitre) surtitre.style.color = "#ffffff";

const cartes = document.querySelectorAll(".carte");
for (let i = 0; i < cartes.length; i++) {
  const nom = cartes[i].querySelector("h2, h3");
  if (nom && nom.textContent.includes("Jasmin")) cartes[i].classList.add("populaire");
}

const liste = document.querySelector(".cartes:not(.cartes-colonne)");
if (liste) {
  const carte = document.createElement("article");
  carte.classList.add("carte");
  const image = document.createElement("img");
  image.src = "images/studio-tunis.svg";
  image.alt = "Studio à Ariana";
  carte.appendChild(image);

  const texte = document.createElement("div");
  texte.classList.add("carte-texte");
  const nom = document.createElement("h3");
  nom.textContent = "Petit studio Ariana";
  const prix = document.createElement("p");
  prix.classList.add("prix");
  prix.textContent = "110 DT / nuit";
  texte.appendChild(nom);
  texte.appendChild(prix);
  carte.appendChild(texte);
  liste.appendChild(carte);
}

const navigation = document.querySelector(".navigation");
if (navigation) {
  const boutonMode = document.createElement("button");
  boutonMode.textContent = "Mode sombre";
  boutonMode.classList.add("bouton", "bouton-petit");
  boutonMode.type = "button";
  navigation.appendChild(boutonMode);
  boutonMode.addEventListener("click", function () {
    document.body.classList.toggle("sombre");
  });
}

const formulaire = document.querySelector("#form");
const champMessage = document.querySelector("#message");
const compteur = document.querySelector("#compteur-message");
const apercu = document.querySelector("#apercu");
const retour = document.querySelector("#retour");

function actualiserCompteur() {
  const nombre = champMessage.value.length;
  compteur.textContent = nombre + " / 300 caractères";
  compteur.classList.toggle("depasse", nombre > 280);
}

function actualiserApercu() {
  const logement = document.querySelector("#atelier");
  const niveau = document.querySelector('input[name="niveau"]:checked');
  if (logement.value !== "" && niveau) {
    apercu.textContent = "Logement : " + logement.value + " · Séjour : " + niveau.value;
  } else {
    apercu.textContent = "Choisis un logement et un type de séjour.";
  }
}

function setErreur(champ, zone, message) {
  champ.classList.add("is-invalid");
  champ.classList.remove("is-valid");
  zone.textContent = message;
}

function setSucces(champ, zone) {
  champ.classList.remove("is-invalid");
  champ.classList.add("is-valid");
  zone.textContent = "";
}

function verifierChamp(champ, idErreur, condition, message) {
  const zone = document.querySelector(idErreur);
  if (condition) {
    setSucces(champ, zone);
    return true;
  }
  setErreur(champ, zone, message);
  return false;
}

function validerFormulaire() {
  let valide = true;
  const nom = document.querySelector("#nom");
  const prenom = document.querySelector("#prenom");
  const email = document.querySelector("#email");
  const logement = document.querySelector("#atelier");
  const zoneNiveau = document.querySelector("#zone-niveau");
  const niveau = document.querySelector('input[name="niveau"]:checked');

  valide = verifierChamp(nom, "#err-nom", nom.value.trim().length >= 2, "Nom trop court") && valide;
  valide = verifierChamp(prenom, "#err-prenom", prenom.value.trim().length >= 2, "Prénom trop court") && valide;
  valide = verifierChamp(email, "#err-email", /^\S+@\S+\.\S+$/.test(email.value), "Email invalide") && valide;
  valide = verifierChamp(logement, "#err-atelier", logement.value !== "", "Choisis un logement") && valide;
  valide = verifierChamp(zoneNiveau, "#err-niveau", niveau !== null, "Indique ton type de séjour") && valide;
  valide =
    verifierChamp(champMessage, "#err-message", champMessage.value.length <= 300, "300 caractères maximum") && valide;
  return valide;
}

if (formulaire) {
  formulaire.noValidate = true;
  champMessage.addEventListener("input", actualiserCompteur);
  document.querySelector("#atelier").addEventListener("change", actualiserApercu);

  const choix = document.querySelectorAll('input[name="niveau"]');
  for (let i = 0; i < choix.length; i++) choix[i].addEventListener("change", actualiserApercu);

  formulaire.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validerFormulaire()) {
      retour.textContent =
        "Merci " + document.querySelector("#nom").value.trim() + " ! Demande prête pour la démonstration.";
    } else {
      retour.textContent = "Corrige les erreurs avant d'envoyer.";
    }
  });

  function viderMessages() {
    const zones = document.querySelectorAll(".erreur");
    for (let i = 0; i < zones.length; i++) zones[i].textContent = "";
    const etats = document.querySelectorAll(".is-invalid, .is-valid");
    for (let i = 0; i < etats.length; i++) etats[i].classList.remove("is-invalid", "is-valid");
    retour.textContent = "";
    apercu.textContent = "";
    compteur.textContent = "0 / 300 caractères";
    compteur.classList.remove("depasse");
  }

  formulaire.addEventListener("reset", viderMessages);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") formulaire.reset();
  });
}

const connexion = document.querySelector("#form-connexion");
if (connexion) {
  connexion.addEventListener("submit", function (event) {
    event.preventDefault();
    if (connexion.checkValidity()) {
      document.querySelector("#message-connexion").textContent = "Connexion valide pour la démonstration.";
      connexion.reset();
    } else {
      document.querySelector("#message-connexion").textContent = "Vérifie ton email et ton mot de passe.";
      connexion.reportValidity();
    }
  });
}
