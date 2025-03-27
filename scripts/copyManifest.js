const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const sourceManifest = path.join(projectRoot, 'manifest.json');
const destinationDir = path.join(projectRoot, 'dist');
const destinationManifest = path.join(destinationDir, 'manifest.json');

// Fichiers d'icônes à copier
const iconFilenames = ['icon.png', 'icon192.png', 'icon512.png'];
const sourceIconsDir = path.join(projectRoot, 'assets', 'images');

// Vérifie l'existence du manifest
if (!fs.existsSync(sourceManifest)) {
  console.error('❌ Le fichier manifest.json est introuvable à la racine.');
  process.exit(1);
}

// Crée le dossier dist si besoin
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir);
}

// Copie le manifest
fs.copyFileSync(sourceManifest, destinationManifest);
console.log('✅ manifest.json copié dans dist/');

// Copie les icônes
iconFilenames.forEach((filename) => {
  const source = path.join(sourceIconsDir, filename);
  const destination = path.join(destinationDir, filename);

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    console.log(`✅ ${filename} copié dans dist/`);
  } else {
    console.warn(`⚠️  ${filename} est introuvable dans assets/images`);
  }
});