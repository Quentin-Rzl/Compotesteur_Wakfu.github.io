/* ============================================================
   PAGE PERSONNAGE - Script commun
   ------------------------------------------------------------
   Chaque page personnage (ex: xelor.html) appelle
   initPersonnagePage({ baseId, resume, videoUrl }) après avoir
   chargé donnees-personnages.js.

   Le nom, l'icône et les rôles sont allés chercher automatiquement
   dans donnees-personnages.js à partir de "baseId" — seuls le
   texte de résumé et l'URL vidéo sont à fournir par page.
   ============================================================ */

function initPersonnagePage({ baseId, resume, videoUrl, rolesGameplay, difficulte }) {
  const { CLASSES, PERSONNAGES } = window.PersonnagesData;
  const classe = CLASSES.find(c => c.baseId === baseId);

  if (!classe) {
    document.body.innerHTML = `<p style="color:#fff; padding:40px;">Personnage inconnu : "${baseId}"</p>`;
    return;
  }

  // En-tête : nom du personnage
  document.getElementById("perso-nom").textContent = classe.label;
  document.title = `${classe.label} — Compotesteur Wakfu`;

  // Résumé
  document.getElementById("perso-resume").textContent = resume;

  // Vidéo
  const video = document.getElementById("perso-video");
  video.querySelector("source").src = videoUrl;
  video.load();

  // Rôles de variante disponibles (Support / Tank / Dps, déduits de PERSONNAGES)
  const rolesEl = document.getElementById("perso-roles");
  const rolesVariantes = classe.variantes
    .map(id => PERSONNAGES[id].role)
    .filter(role => role !== null);

  rolesEl.innerHTML = rolesVariantes.length > 0
    ? rolesVariantes.map(r => `<span class="role-badge">${r}</span>`).join("")
    : "";

  // Bloc gameplay : rôles (icônes) à gauche, difficulté (étoiles) à droite
  const gameplayEl = document.getElementById("perso-gameplay-info");
  const rolesListHTML = (rolesGameplay || [])
    .map(r => `<li><img src="${r.icon}" alt="${r.label}"><span>${r.label}</span></li>`)
    .join("");

  const nbEtoiles = difficulte || 0;
  const STAR_PATH = "M12 2.5 L14.9 8.6 21.6 9.5 16.8 14.1 18 20.8 12 17.6 6 20.8 7.2 14.1 2.4 9.5 9.1 8.6 Z";
  const etoilesHTML = Array.from({ length: 3 }, (_, i) => {
    const remplie = i < nbEtoiles;
    return `
      <svg class="star-icon ${remplie ? "star-filled" : "star-empty"}" viewBox="0 0 24 24">
        <path d="${STAR_PATH}" />
      </svg>
    `;
  }).join("");

  gameplayEl.innerHTML = `
    <div class="gameplay-col">
      <h3>Rôles</h3>
      <ul class="gameplay-roles-list">${rolesListHTML}</ul>
    </div>
    <div class="gameplay-col gameplay-difficulte">
      <h3>Difficulté</h3>
      <div class="gameplay-stars">${etoilesHTML}</div>
    </div>
  `;
}
