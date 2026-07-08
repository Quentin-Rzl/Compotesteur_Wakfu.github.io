/* ============================================================
   COMPOTESTEUR - Logique de calcul (règles du jeu uniquement)
   ------------------------------------------------------------
   Ce fichier NE CONTIENT PLUS les statistiques des personnages :
   elles vivent dans donnees-personnages.js, qui doit être chargé
   AVANT ce fichier (voir synergie.html).

   Ce fichier ne contient que :
   - les seuils utilisés pour générer les remarques automatiques
   - le calcul du bilan à partir de 3 identifiants de personnages
   ============================================================ */

/* ------------------------------------------------------------
   1. SEUILS D'EVALUATION (règles du jeu, pas des données perso)
------------------------------------------------------------- */
const SEUILS = {
  Feu:    { max: 30, bas: 15, haut: 20, texteBas: "n'a pas assez de dégâts feu !",      texteMoyen: "a suffisamment de dégâts feu.",      texteHaut: "a énormément de dégâts feu !" },
  Eau:    { max: 30, bas: 15, haut: 20, texteBas: "n'a pas assez de dégâts eau !",      texteMoyen: "a suffisamment de dégâts eau.",      texteHaut: "a énormément de dégâts eau !" },
  Terre:  { max: 30, bas: 15, haut: 20, texteBas: "n'a pas assez de dégâts terre !",    texteMoyen: "a suffisamment de dégâts terre.",    texteHaut: "a énormément de dégâts terre !" },
  Vent:   { max: 30, bas: 15, haut: 20, texteBas: "n'a pas assez de dégâts vent !",     texteMoyen: "a suffisamment de dégâts vent.",     texteHaut: "a énormément de dégâts vent !" },
  Def:    { max: 20, bas: 13, haut: 18, texteBas: "est trop fragile !",                 texteMoyen: "est assez résistante.",              texteHaut: "a énormément de résistance !" },
  Soin:   { max: 20, bas: 12, haut: 17, texteBas: "ne peut pas se soigner correctement !", texteMoyen: "a assez de soins.",               texteHaut: "a un surplus de soins !" },
  Buff:   { max: 20, bas: 10, haut: 15, texteBas: "a trop peu de buffs !",               texteMoyen: "a assez de buffs.",                  texteHaut: "a énormément de buffs !" },
  Debuff: { max: 20, bas: 10, haut: 15, texteBas: "a trop peu de débuffs !",             texteMoyen: "a assez de débuffs.",                texteHaut: "a énormément de débuffs !" }
};

const SEUILS_PLACEMENT = {
  All: { bas: 15, haut: 25, texteBas: "Difficile", texteMoyen: "Normal", texteHaut: "Facile" },
  Ene: { bas: 10, haut: 16, texteBas: "Difficile", texteMoyen: "Normal", texteHaut: "Facile" }
};

/* ------------------------------------------------------------
   2. FONCTIONS UTILITAIRES
------------------------------------------------------------- */

// Récupère les données d'un personnage (stats, ordre de jeu) via son identifiant
function getPersonnage(id) {
  const { PERSONNAGES } = window.PersonnagesData;
  return PERSONNAGES[id] || null;
}

// Évalue un score par rapport à un seuil et retourne { note, commentaire, niveau }
function evaluerStat(cle, p1, p2, p3) {
  const s = SEUILS[cle];
  const note = p1.stats[cle] + p2.stats[cle] + p3.stats[cle];
  let niveau, commentaire;
  if (note < s.bas) {
    niveau = "bas";
    commentaire = `L'équipe ${s.texteBas}`;
  } else if (note < s.haut) {
    niveau = "moyen";
    commentaire = `L'équipe ${s.texteMoyen}`;
  } else {
    niveau = "haut";
    commentaire = `L'équipe ${s.texteHaut}`;
  }
  return { stat: cle, note, max: s.max, niveau, commentaire };
}

// Évalue le placement (alliés ou ennemis)
function evaluerPlacement(cle, p1, p2, p3) {
  const s = SEUILS_PLACEMENT[cle];
  const note = p1.stats[cle] + p2.stats[cle] + p3.stats[cle];
  let resultat;
  if (note < s.bas) resultat = s.texteBas;
  else if (note < s.haut) resultat = s.texteMoyen;
  else resultat = s.texteHaut;
  return { note, resultat };
}

/* ------------------------------------------------------------
   3. FONCTION PRINCIPALE
   ------------------------------------------------------------
   ids : tableau de 3 identifiants (clés de PERSONNAGES, ex:
   "Osa_Tank", "Cra"). Les doublons sont autorisés.

   Retour : objet structuré exploitable par l'interface, ou
   { erreur: "message" } en cas de problème.
------------------------------------------------------------- */
function testerEquipe3(ids) {
  if (!Array.isArray(ids) || ids.length !== 3) {
    return { erreur: "Le nombre de personnages sélectionnés est incorrect ! (3 attendus)" };
  }

  const personnages = ids.map(getPersonnage);
  if (personnages.some(p => p === null)) {
    const idInconnu = ids[personnages.indexOf(null)];
    return { erreur: `Personnage inconnu : "${idInconnu}"` };
  }
  const [P1, P2, P3] = personnages;

  // Dégâts élémentaires
  const degats = ["Feu", "Eau", "Terre", "Vent"].map(cle =>
    evaluerStat(cle, P1, P2, P3)
  );

  // Défense et soins
  const defenseEtSoins = ["Def", "Soin"].map(cle =>
    evaluerStat(cle, P1, P2, P3)
  );

  // Buffs et débuffs
  const buffsEtDebuffs = ["Buff", "Debuff"].map(cle =>
    evaluerStat(cle, P1, P2, P3)
  );

  // Placement
  const placement = {
    allies: evaluerPlacement("All", P1, P2, P3),
    ennemis: evaluerPlacement("Ene", P1, P2, P3)
  };

  // Ordre de jeu conseillé (basé sur l'identifiant précis choisi,
  // ex: "Osa_Tank" et "Osa_Dps" peuvent avoir un ordre différent)
  const { ORDRE_JEU } = window.PersonnagesData;
  const ordreDeJeu = ids
    .map(id => ({ id, valeur: ORDRE_JEU[id] }))
    .sort((a, b) => a.valeur - b.valeur)
    .map(p => p.id);

  return {
    erreur: null,
    composition: ids,
    categories: [
      { titre: "Dégâts élémentaires", stats: degats },
      { titre: "Défense et soins", stats: defenseEtSoins },
      { titre: "Buffs et Débuffs", stats: buffsEtDebuffs }
    ],
    placement,
    ordreDeJeu
  };
}

/* ------------------------------------------------------------
   EXPORT
------------------------------------------------------------- */
window.Compotesteur = { testerEquipe3 };
