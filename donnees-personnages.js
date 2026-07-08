/* ============================================================
   DONNEES PERSONNAGES - Compotesteur Wakfu
   ------------------------------------------------------------
   Ce fichier est LA SEULE source de vérité pour :
   - la liste des personnages et leurs sous-classes
   - leurs statistiques (Feu, Eau, Terre, Vent, Def, Soin,
     Buff, Debuff, All, Ene — valeurs de 0 à 10)
   - leur ordre de jeu de référence

   Tu peux modifier librement les valeurs de "stats" ci-dessous
   pour rééquilibrer un personnage ou une sous-classe.
   compotesteur.js n'a JAMAIS besoin d'être modifié pour ça.

   Pour AJOUTER une sous-classe à un personnage qui n'en a pas
   encore : ajoute une entrée dans PERSONNAGES (copie une entrée
   existante et adapte les valeurs), puis ajoute son identifiant
   dans le tableau "variantes" du personnage correspondant dans
   CLASSES, et donne-lui un rang dans ORDRE_JEU.
   ============================================================ */

/* ------------------------------------------------------------
   1. PERSONNAGES ET SOUS-CLASSES
   ------------------------------------------------------------
   Chaque entrée est identifiée par une clé unique (utilisée
   partout ailleurs dans le programme pour désigner ce personnage
   précis). "role" sert uniquement à l'affichage du sous-menu
   (Support / Tank / Dps) — laisser à null pour un personnage
   sans variante.
------------------------------------------------------------- */
const PERSONNAGES = {

  // --- Cra (pas de sous-classe) ---
  Cra: {
    label: "Cra", baseId: "Cra", role: null,
    stats: { Feu: 10, Eau: 0, Terre: 10, Vent: 10, Def: 3, Soin: 2, Buff: 2, Debuff: 2, All: 6, Ene: 3 }
  },

  // --- Ecaflip (Support / Dps) ---
  Eca_Supp: {
    label: "Ecaflip (Support)", baseId: "Eca", role: "Support",
    stats: { Feu: 4, Eau: 4, Terre: 4, Vent: 0, Def: 3, Soin: 8, Buff: 8, Debuff: 4, All: 2, Ene: 4 }
  },
  Eca_Dps: {
    label: "Ecaflip (Dps)", baseId: "Eca", role: "Dps",
    stats: { Feu: 10, Eau: 10, Terre: 10, Vent: 0, Def: 3, Soin: 3, Buff: 4, Debuff: 4, All: 2, Ene: 4 }
  },

  // --- Eliotrope (Support / Dps) ---
  Elio_Supp: {
    label: "Eliotrope (Support)", baseId: "Elio", role: "Support",
    stats: { Feu: 0, Eau: 6, Terre: 4, Vent: 6, Def: 3, Soin: 7, Buff: 2, Debuff: 2, All: 10, Ene: 4 }
  },
  Elio_Dps: {
    label: "Eliotrope (Dps)", baseId: "Elio", role: "Dps",
    stats: { Feu: 0, Eau: 10, Terre: 10, Vent: 10, Def: 3, Soin: 2, Buff: 2, Debuff: 2, All: 8, Ene: 2 }
  },

  // --- Eniripsa (pas de sous-classe) ---
  Eni: {
    label: "Eniripsa", baseId: "Eni", role: null,
    stats: { Feu: 2, Eau: 8, Terre: 0, Vent: 4, Def: 4, Soin: 10, Buff: 8, Debuff: 8, All: 2, Ene: 3 }
  },

  // --- Enutrof (pas de sous-classe) ---
  Enu: {
    label: "Enutrof", baseId: "Enu", role: null,
    stats: { Feu: 8, Eau: 8, Terre: 8, Vent: 0, Def: 7, Soin: 2, Buff: 4, Debuff: 4, All: 8, Ene: 4 }
  },

  // --- Feca (pas de sous-classe) ---
  Feca: {
    label: "Feca", baseId: "Feca", role: null,
    stats: { Feu: 2, Eau: 2, Terre: 2, Vent: 0, Def: 10, Soin: 3, Buff: 8, Debuff: 4, All: 4, Ene: 6 }
  },

  // --- Hupermage (Support / Dps) ---
  Hup_Supp: {
    label: "Hupermage (Support)", baseId: "Hup", role: "Support",
    stats: { Feu: 4, Eau: 4, Terre: 4, Vent: 4, Def: 3, Soin: 7, Buff: 2, Debuff: 2, All: 6, Ene: 2 }
  },
  Hup_Dps: {
    label: "Hupermage (Dps)", baseId: "Hup", role: "Dps",
    stats: { Feu: 8, Eau: 8, Terre: 8, Vent: 8, Def: 3, Soin: 1, Buff: 2, Debuff: 2, All: 4, Ene: 2 }
  },

  // --- Iop (Support / Dps) ---
  Iop_Supp: {
    label: "Iop (Support)", baseId: "Iop", role: "Support",
    stats: { Feu: 4, Eau: 0, Terre: 4, Vent: 4, Def: 6, Soin: 3, Buff: 7, Debuff: 4, All: 5, Ene: 2 }
  },
  Iop_Dps: {
    label: "Iop (Dps)", baseId: "Iop", role: "Dps",
    stats: { Feu: 10, Eau: 0, Terre: 10, Vent: 7, Def: 6, Soin: 2, Buff: 2, Debuff: 4, All: 5, Ene: 2 }
  },

  // --- Osamodas (Support / Tank / Dps) ---
  Osa_Supp: {
    label: "Osamodas (Support)", baseId: "Osa", role: "Support",
    stats: { Feu: 4, Eau: 1, Terre: 4, Vent: 4, Def: 5, Soin: 7, Buff: 8, Debuff: 6, All: 6, Ene: 6 }
  },
  Osa_Tank: {
    label: "Osamodas (Tank)", baseId: "Osa", role: "Tank",
    stats: { Feu: 2, Eau: 1, Terre: 2, Vent: 2, Def: 8, Soin: 3, Buff: 4, Debuff: 6, All: 4, Ene: 6 }
  },
  Osa_Dps: {
    label: "Osamodas (Dps)", baseId: "Osa", role: "Dps",
    stats: { Feu: 8, Eau: 7, Terre: 8, Vent: 8, Def: 2, Soin: 1, Buff: 2, Debuff: 2, All: 2, Ene: 4 }
  },

  // --- Ouginak (pas de sous-classe) ---
  Ougi: {
    label: "Ouginak", baseId: "Ougi", role: null,
    stats: { Feu: 0, Eau: 10, Terre: 8, Vent: 8, Def: 7, Soin: 2, Buff: 2, Debuff: 4, All: 5, Ene: 4 }
  },

  // --- Pandawa (pas de sous-classe) ---
  Panda: {
    label: "Pandawa", baseId: "Panda", role: null,
    stats: { Feu: 2, Eau: 2, Terre: 2, Vent: 0, Def: 10, Soin: 3, Buff: 6, Debuff: 6, All: 6, Ene: 10 }
  },

  // --- Roublard (pas de sous-classe) ---
  Roub: {
    label: "Roublard", baseId: "Roub", role: null,
    stats: { Feu: 10, Eau: 0, Terre: 10, Vent: 10, Def: 3, Soin: 2, Buff: 2, Debuff: 2, All: 5, Ene: 2 }
  },

  // --- Sacrieur (Tank / Dps) ---
  Sacri_Tank: {
    label: "Sacrieur (Tank)", baseId: "Sacri", role: "Tank",
    stats: { Feu: 4, Eau: 0, Terre: 4, Vent: 4, Def: 9, Soin: 2, Buff: 2, Debuff: 2, All: 7, Ene: 7 }
  },
  Sacri_Dps: {
    label: "Sacrieur (Dps)", baseId: "Sacri", role: "Dps",
    stats: { Feu: 10, Eau: 0, Terre: 8, Vent: 8, Def: 3, Soin: 2, Buff: 2, Debuff: 2, All: 3, Ene: 7 }
  },

  // --- Sadida (Support / Dps) ---
  Sadi_Supp: {
    label: "Sadida (Support)", baseId: "Sadi", role: "Support",
    stats: { Feu: 0, Eau: 2, Terre: 4, Vent: 2, Def: 6, Soin: 8, Buff: 6, Debuff: 8, All: 4, Ene: 4 }
  },
  Sadi_Dps: {
    label: "Sadida (Dps)", baseId: "Sadi", role: "Dps",
    stats: { Feu: 0, Eau: 7, Terre: 7, Vent: 7, Def: 4, Soin: 4, Buff: 4, Debuff: 6, All: 3, Ene: 3 }
  },

  // --- Sram (pas de sous-classe) ---
  Sram: {
    label: "Sram", baseId: "Sram", role: null,
    stats: { Feu: 10, Eau: 10, Terre: 0, Vent: 10, Def: 3, Soin: 3, Buff: 2, Debuff: 6, All: 8, Ene: 4 }
  },

  // --- Steamer (Tank / Dps) ---
  Steam_Tank: {
    label: "Steamer (Tank)", baseId: "Steam", role: "Tank",
    stats: { Feu: 2, Eau: 3, Terre: 3, Vent: 3, Def: 10, Soin: 4, Buff: 2, Debuff: 2, All: 7, Ene: 3 }
  },
  Steam_Dps: {
    label: "Steamer (Dps)", baseId: "Steam", role: "Dps",
    stats: { Feu: 8, Eau: 10, Terre: 10, Vent: 8, Def: 3, Soin: 4, Buff: 2, Debuff: 2, All: 7, Ene: 3 }
  },

  // --- Xélor (pas de sous-classe) ---
  Xel: {
    label: "Xélor", baseId: "Xel", role: null,
    stats: { Feu: 10, Eau: 10, Terre: 0, Vent: 10, Def: 3, Soin: 2, Buff: 2, Debuff: 2, All: 6, Ene: 3 }
  },

  // --- Zobal (pas de sous-classe) ---
  Zobal: {
    label: "Zobal", baseId: "Zobal", role: null,
    stats: { Feu: 6, Eau: 6, Terre: 0, Vent: 6, Def: 4, Soin: 7, Buff: 8, Debuff: 4, All: 6, Ene: 4 }
  }
};

/* ------------------------------------------------------------
   2. ORDRE DE JEU DE REFERENCE
   ------------------------------------------------------------
   Contrairement à avant, le rang est maintenant donné par
   IDENTIFIANT PRECIS (clé de PERSONNAGES) et non plus par
   personnage de base : un même personnage peut donc avoir un
   ordre de jeu différent selon la sous-classe choisie.

   Organisation actuelle, du plus tôt au plus tard :
   Panda, Feca, Zobal, Eni,
   [tous les "Support"],
   Enu,
   [tous les "Tank"],
   Sram, Ougi,
   [tous les "Dps"],
   Roub, Cra, Xel

   Pour ajuster l'ordre : change simplement les nombres ci-dessous
   (plus petit = joue plus tôt). Les nombres n'ont pas besoin
   d'être consécutifs, seul l'ordre relatif compte.
------------------------------------------------------------- */
const ORDRE_JEU = {
  Panda: 0,
  Feca: 1,
  Zobal: 2,
  Eni: 3,

  // --- Tous les rôles "Support", à la suite de Eni ---
  Eca_Supp: 4,
  Elio_Supp: 5,
  Iop_Supp: 6,
  Hup_Supp: 7,
  Osa_Supp: 8,
  Sadi_Supp: 9,

  Enu: 10,

  // --- Tous les rôles "Tank", à la suite de Enu ---
  Osa_Tank: 11,
  Sacri_Tank: 12,
  Steam_Tank: 13,

  Sram: 14,
  Ougi: 15,

  // --- Tous les rôles "Dps", à la suite de Ougi ---
  Eca_Dps: 16,
  Elio_Dps: 17,
  Iop_Dps: 18,
  Hup_Dps: 19,
  Osa_Dps: 20,
  Sacri_Dps: 21,
  Sadi_Dps: 22,
  Steam_Dps: 23,

  Roub: 24,
  Cra: 25,
  Xel: 26
};

/* ------------------------------------------------------------
   3. CLASSES (pour l'interface : un portrait par classe,
      regroupant ses variantes)
   ------------------------------------------------------------
   "variantes" liste les identifiants PERSONNAGES rattachés à ce
   portrait. Une seule entrée = pas de sous-menu au clic.
------------------------------------------------------------- */
const CLASSES = [
  { baseId: "Cra",   label: "Cra",       img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/cra%20profil.jpg?raw=true",       variantes: ["Cra"] },
  { baseId: "Eca",   label: "Ecaflip",   img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/ecaflip.webp?raw=true",           variantes: ["Eca_Supp", "Eca_Dps"] },
  { baseId: "Elio",  label: "Eliotrope", img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/eliotrope%20profil.jpg?raw=true", variantes: ["Elio_Supp", "Elio_Dps"] },
  { baseId: "Eni",   label: "Eniripsa",  img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/eniripsa.webp?raw=true",          variantes: ["Eni"] },
  { baseId: "Enu",   label: "Enutrof",   img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/enutrof.webp?raw=true",           variantes: ["Enu"] },
  { baseId: "Feca",  label: "Feca",      img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/feca.webp?raw=true",              variantes: ["Feca"] },
  { baseId: "Hup",   label: "Hupermage", img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/hupermage%20profil.jpg?raw=true", variantes: ["Hup_Supp", "Hup_Dps"] },
  { baseId: "Iop",   label: "Iop",       img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/iop%20profil.jpg?raw=true",       variantes: ["Iop_Supp", "Iop_Dps"] },
  { baseId: "Osa",   label: "Osamodas",  img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/osamodas.webp?raw=true",          variantes: ["Osa_Supp", "Osa_Tank", "Osa_Dps"] },
  { baseId: "Ougi",  label: "Ouginak",   img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/ouginak.webp?raw=true",           variantes: ["Ougi"] },
  { baseId: "Panda", label: "Pandawa",   img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/pandawa%20profil.jpg?raw=true",   variantes: ["Panda"] },
  { baseId: "Roub",  label: "Roublard",  img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/roublard%20profil.jpg?raw=true",  variantes: ["Roub"] },
  { baseId: "Sacri", label: "Sacrieur",  img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/sacrieur%20profil.jpg?raw=true",  variantes: ["Sacri_Tank", "Sacri_Dps"] },
  { baseId: "Sadi",  label: "Sadida",    img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/sadida%20profil.jpg?raw=true",    variantes: ["Sadi_Supp", "Sadi_Dps"] },
  { baseId: "Sram",  label: "Sram",      img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/Sram%20profil.jpeg?raw=true",     variantes: ["Sram"] },
  { baseId: "Steam", label: "Steamer",   img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/steamer%20profil.jpg?raw=true",   variantes: ["Steam_Tank", "Steam_Dps"] },
  { baseId: "Xel",   label: "Xélor",     img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/x%C3%A9lor%20profil.jpg?raw=true", variantes: ["Xel"] },
  { baseId: "Zobal", label: "Zobal",     img: "https://github.com/Quentin-Rzl/Compotesteur_Wakfu.github.io/blob/main/Images/Classes/zobal%20profil.png?raw=true",     variantes: ["Zobal"] }
];

/* ------------------------------------------------------------
   EXPORT
------------------------------------------------------------- */
window.PersonnagesData = { PERSONNAGES, ORDRE_JEU, CLASSES };
