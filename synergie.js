/* ============================================================
   SYNERGIE - Sélection (gauche) + Résultat (droite), même page
   ------------------------------------------------------------
   Utilise CLASSES / PERSONNAGES depuis donnees-personnages.js
   (chargé avant ce fichier) et testerEquipe3() depuis
   compotesteur.js (chargé juste après).
   ============================================================ */

const CLASSES_LISTE = window.PersonnagesData.CLASSES;
const PERSONNAGES_DATA = window.PersonnagesData.PERSONNAGES;

const MAX_SELECTION = 3;
let selection = []; // tableau d'identifiants (clés de PERSONNAGES), doublons autorisés
let menuOuvert = null; // baseId du menu de rôle actuellement ouvert (ou null)

const grid = document.getElementById("character-grid");
const slotsEl = document.getElementById("selection-slots");
const countEl = document.getElementById("selection-count");
const validerBtn = document.getElementById("valider-btn");
const resetBtn = document.getElementById("reset-btn");
const resultatEl = document.getElementById("resultat-contenu");

/* ------------------------------------------------------------
   1. GENERATION DE LA GRILLE DE SELECTION
------------------------------------------------------------- */
function renderGrid() {
  grid.innerHTML = "";
  CLASSES_LISTE.forEach(classe => {
    const wrapper = document.createElement("div");
    wrapper.className = "icon-slot icon-wrapper";
    wrapper.dataset.baseId = classe.baseId;

    const btn = document.createElement("button");
    btn.className = "icon-button-inner";
    btn.type = "button";
    btn.innerHTML = `
      <img src="${classe.img}" alt="${classe.label}">
      <span class="icon-name">${classe.label}</span>
    `;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onClicPersonnage(classe);
    });

    wrapper.appendChild(btn);
    grid.appendChild(wrapper);
  });
}

/* ------------------------------------------------------------
   2. CLIC SUR UN PERSONNAGE : ajout direct OU sous-menu de rôle
------------------------------------------------------------- */
function onClicPersonnage(classe) {
  if (classe.variantes.length === 1) {
    ajouterVariante(classe.variantes[0]);
    fermerMenu();
    return;
  }
  // Plusieurs variantes disponibles : ouvrir/fermer le sous-menu
  if (menuOuvert === classe.baseId) {
    fermerMenu();
  } else {
    ouvrirMenu(classe);
  }
}

function ouvrirMenu(classe) {
  fermerMenu();
  menuOuvert = classe.baseId;

  const wrapper = grid.querySelector(`.icon-wrapper[data-base-id="${classe.baseId}"]`);
  const menu = document.createElement("div");
  menu.className = "role-menu";

  classe.variantes.forEach(id => {
    const perso = PERSONNAGES_DATA[id];
    const item = document.createElement("button");
    item.type = "button";
    item.className = "role-menu-item";
    item.textContent = perso.role;
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      ajouterVariante(id);
      fermerMenu();
    });
    menu.appendChild(item);
  });

  wrapper.appendChild(menu);
}

function fermerMenu() {
  const menuExistant = grid.querySelector(".role-menu");
  if (menuExistant) menuExistant.remove();
  menuOuvert = null;
}

// Ferme le sous-menu si on clique ailleurs sur la page
document.addEventListener("click", fermerMenu);

/* ------------------------------------------------------------
   3. GESTION DE LA SELECTION (max 3, doublons autorisés)
------------------------------------------------------------- */
function ajouterVariante(id) {
  if (selection.length >= MAX_SELECTION) return;
  selection.push(id);
  updateSelectionUI();
}

function retirerSlot(index) {
  if (index >= selection.length) return;
  selection.splice(index, 1);
  updateSelectionUI();
}

function updateSelectionUI() {
  const slots = slotsEl.querySelectorAll(".selection-slot");
  slots.forEach((slot, i) => {
    const id = selection[i];
    const perso = id ? PERSONNAGES_DATA[id] : null;
    if (perso) {
      const classe = CLASSES_LISTE.find(c => c.baseId === perso.baseId);
      slot.classList.add("filled");
      slot.innerHTML = `<img src="${classe.img}" alt="${perso.label}"><span>${perso.label}</span>`;
      slot.onclick = () => retirerSlot(i);
      slot.title = "Cliquer pour retirer";
    } else {
      slot.classList.remove("filled");
      slot.innerHTML = "";
      slot.onclick = null;
      slot.title = "";
    }
  });

  countEl.textContent = `${selection.length} / ${MAX_SELECTION} sélectionné(s)`;
  validerBtn.disabled = selection.length !== MAX_SELECTION;

  grid.querySelectorAll(".icon-button-inner").forEach(btn => {
    btn.classList.toggle("disabled", selection.length >= MAX_SELECTION);
  });
}

resetBtn.addEventListener("click", () => {
  selection = [];
  updateSelectionUI();
});

/* ------------------------------------------------------------
   4. CALCUL ET AFFICHAGE DU RESULTAT (colonne de droite)
------------------------------------------------------------- */

// Icônes rondes affichées à gauche des dégâts élémentaires
const ICONES_ELEMENT = {
  Feu:   "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/synergies/%C3%A9l%C3%A9ment%20feu.jpg?raw=true",
  Eau:   "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/synergies/%C3%A9l%C3%A9ment%20eau.jpg?raw=true",
  Terre: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/synergies/%C3%A9l%C3%A9ment%20terre.jpg?raw=true",
  Vent:  "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/synergies/%C3%A9l%C3%A9ment%20vent.jpg?raw=true"
};

// Textes des infobulles (survol de l'icône "i" à côté de chaque titre)
const TOOLTIPS = {
  "Dégâts élémentaires": "Les dégâts réalisés par l'équipe. Ils peuvent être de 4 éléments différents. Il est important de varier les types de dégâts de l'équipe pour être capable de faire tomber n'importe quel adversaire.",
  "Défense et soins": "La capacité de survie de l'équipe. La défense est définie en fonction des résistances élémentaires et de la parade. La quantité de soin de l'équipe prend en compte les soins sur alliés et sur soi-même.",
  "Buffs et Débuffs": "Capacité de l'équipe à se renforcer ou à appliquer des effets néfastes sur l'adversaire. L'impact des buffs et débuffs dans un combat permet de compenser un manque de stats ou de renforcer un avantage comme un DPS principal ou une faible résistance ennemie.",
  "Placement des unités": "Capacité de déplacement de l'équipe et à restreindre ou bouger les adversaires. Prend en compte les téléportations, ruées, stabilisations, et augmentation/réduction des PM.",
  "Ordre de jeu conseillé": "L'ordre de jeu optimise l'application des buffs/débuffs et le placement des adversaires. Par exemple : les tanks jouent avant les DPS pour bloquer les adversaires dangereux."
};

function titreAvecInfo(titre) {
  const texte = TOOLTIPS[titre];
  if (!texte) return titre;
  return `${titre}<span class="info-icon" tabindex="0">i<span class="info-tooltip">${texte}</span></span>`;
}

function couleurNiveau(niveau) {
  if (niveau === "bas") return "#e05e5e";   // rouge : "pas assez"
  if (niveau === "haut") return "#e0c95e";  // jaune : "trop" / "surplus"
  return "#2f8f6d";                          // vert (plus foncé) : "assez"
}

function afficherResultat(resultat) {
  const nomsAffiches = resultat.composition.map(id => PERSONNAGES_DATA[id].label).join(" ; ");

  const categoriesHTML = resultat.categories.map(cat => `
    <div class="resultat-categorie">
      <h2>${titreAvecInfo(cat.titre)}</h2>
      ${cat.stats.map(s => `
        <div class="resultat-stat">
          <div class="resultat-stat-header">
            <span class="resultat-stat-label">
              ${ICONES_ELEMENT[s.stat] ? `<img class="stat-icon" src="${ICONES_ELEMENT[s.stat]}" alt="${s.stat}">` : ""}
              ${s.commentaire}
            </span>
            <span class="resultat-stat-note">${s.note} / ${s.max}</span>
          </div>
          <div class="resultat-bar">
            <div class="resultat-bar-fill" style="width:${Math.min(100, (s.note / s.max) * 100)}%; background:${couleurNiveau(s.niveau)};"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `).join("");

  resultatEl.innerHTML = `
    <div class="resultat-bloc">
      <div class="resultat-header">
        <h1>Bilan de l'équipe</h1>
        <p class="resultat-composition">${nomsAffiches}</p>
      </div>

      ${categoriesHTML}

      <div class="resultat-categorie">
        <h2>${titreAvecInfo("Placement des unités")}</h2>
        <p>Alliés : <strong>${resultat.placement.allies.resultat}</strong></p>
        <p>Ennemis : <strong>${resultat.placement.ennemis.resultat}</strong></p>
      </div>

      <div class="resultat-categorie">
        <h2>${titreAvecInfo("Ordre de jeu conseillé")}</h2>
        <p>${resultat.ordreDeJeu.map(id => PERSONNAGES_DATA[id].label).join(" > ")}</p>
      </div>
    </div>
  `;
}

validerBtn.addEventListener("click", () => {
  if (selection.length !== MAX_SELECTION) return;

  const resultat = window.Compotesteur.testerEquipe3(selection);

  if (resultat.erreur) {
    resultatEl.innerHTML = `<div class="resultat-erreur"><p>${resultat.erreur}</p></div>`;
    return;
  }

  afficherResultat(resultat);
});

/* ------------------------------------------------------------
   Initialisation
------------------------------------------------------------- */
renderGrid();
updateSelectionUI();
