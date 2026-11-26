const titre = document.querySelector(".hero h1"); if (titre) titre.textContent = "Trouve un logement dans le Grand Tunis";
const surtitre = document.querySelector(".hero .surtitre"); if (surtitre) surtitre.style.color = "#ffffff";

const cartes = document.querySelectorAll(".carte");
for (let i = 0; i < cartes.length; i++) {
  const nom = cartes[i].querySelector("h2, h3");
  if (nom && nom.textContent.includes("Jasmin")) cartes[i].classList.add("populaire");
}
const liste = document.querySelector(".cartes:not(.cartes-colonne)");
if (liste) { const carte = document.createElement("article"), nom = document.createElement("h3"); carte.className = "carte carte-nouveau"; nom.textContent = "Studio Ariana · 110 DT / nuit"; carte.appendChild(nom); liste.appendChild(carte); }

const form = document.querySelector("#form");
if (form) {
  const message = document.querySelector("#message"), compteur = document.querySelector("#compteur-message");
  const apercu = document.querySelector("#apercu"), retour = document.querySelector("#retour");
  let valide = true;
  function compter() {
    compteur.textContent = message.value.length + " / 300 caractères";
    compteur.classList.toggle("depasse", message.value.length > 280);
  }
  function setErreur(champ, id, texte) {
    champ.classList.add("is-invalid"); champ.classList.remove("is-valid"); document.querySelector(id).textContent = texte;
  }
  function setSucces(champ, id) {
    champ.classList.remove("is-invalid"); champ.classList.add("is-valid"); document.querySelector(id).textContent = "";
  }
  function verifier(champ, id, correct, texte) {
    if (correct) setSucces(champ, id);
    else { setErreur(champ, id, texte); valide = false; }
  }
  function validerFormulaire() {
    valide = true;
    const nom = document.querySelector("#nom"), prenom = document.querySelector("#prenom");
    const email = document.querySelector("#email"), logement = document.querySelector("#logement");
    const date = document.querySelector("#arrivee"), nuits = document.querySelector("#nuits");
    const zone = document.querySelector("#zone-sejour"), sejour = document.querySelector('input[name="sejour"]:checked');
    verifier(nom, "#err-nom", nom.value.trim().length >= 2, "Nom trop court");
    verifier(prenom, "#err-prenom", prenom.value.trim().length >= 2, "Prénom trop court");
    verifier(email, "#err-email", /^\S+@\S+\.\S+$/.test(email.value), "Email invalide");
    verifier(logement, "#err-logement", logement.value !== "", "Choisis un logement");
    verifier(date, "#err-arrivee", date.value !== "", "Choisis une date");
    verifier(nuits, "#err-nuits", nuits.value >= 1 && nuits.value <= 30, "Choisis de 1 à 30 nuits");
    verifier(zone, "#err-sejour", sejour !== null, "Indique ton type de séjour");
    verifier(message, "#err-message", message.value.length <= 300, "300 caractères maximum");
  }
  form.noValidate = true;
  form.addEventListener("input", compter);
  form.addEventListener("change", function () { const l = document.querySelector("#logement").value, s = document.querySelector('input[name="sejour"]:checked'); apercu.textContent = l && s ? l + " · " + s.value : "Choisis ton séjour."; });
  form.addEventListener("submit", function (e) {
    e.preventDefault(); validerFormulaire();
    retour.textContent = valide ? "Demande prête pour la démonstration." : "Corrige les erreurs.";
  });
  form.addEventListener("reset", function () {
    const erreurs = document.querySelectorAll(".erreur"), champs = document.querySelectorAll(".is-invalid, .is-valid");
    for (let i = 0; i < erreurs.length; i++) erreurs[i].textContent = "";
    for (let i = 0; i < champs.length; i++) champs[i].classList.remove("is-invalid", "is-valid");
    compteur.textContent = "0 / 300 caractères"; compteur.classList.remove("depasse");
    apercu.textContent = retour.textContent = "";
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") form.reset(); });
}

const connexion = document.querySelector("#form-connexion"); if (connexion) connexion.addEventListener("submit", function (e) {
  e.preventDefault(); document.querySelector("#message-connexion").textContent = "Connexion de démonstration.";
});

const navigation = document.querySelector(".navigation");
if (navigation) {
  const mode = document.createElement("button");
  mode.textContent = "Mode sombre"; mode.className = "bouton bouton-petit"; mode.type = "button";
  navigation.appendChild(mode);
  mode.addEventListener("click", function () {
    document.body.classList.toggle("sombre");
    mode.textContent = document.body.classList.contains("sombre") ? "Mode clair" : "Mode sombre";
  });
}
