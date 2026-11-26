
function verifierInscription(event) {
  event.preventDefault();

  const formulaire = document.getElementById("form-inscription");
  const message = document.getElementById("message-inscription");

  if (formulaire.checkValidity()) {
    message.textContent = "La demande est valide. C'est une démonstration, aucune donnée n'est enregistrée.";
    formulaire.reset();
  } else {
    message.textContent = "Remplis les champs demandés avant d'envoyer.";
    formulaire.reportValidity();
  }
}

function verifierConnexion(event) {
  event.preventDefault();

  const formulaire = document.getElementById("form-connexion");
  const message = document.getElementById("message-connexion");

  if (formulaire.checkValidity()) {
    message.textContent = "Les informations sont valides pour cette démonstration.";
    formulaire.reset();
  } else {
    message.textContent = "Entre un email valide et un mot de passe de 6 caractères minimum.";
    formulaire.reportValidity();
  }
}

const formulaireInscription = document.getElementById("form-inscription");
if (formulaireInscription) {
  formulaireInscription.noValidate = true;
  formulaireInscription.addEventListener("submit", verifierInscription);
}

const formulaireConnexion = document.getElementById("form-connexion");
if (formulaireConnexion) {
  formulaireConnexion.noValidate = true;
  formulaireConnexion.addEventListener("submit", verifierConnexion);
}
