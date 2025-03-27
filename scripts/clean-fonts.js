const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../dist/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts');

// Nom de la font à garder
const allowedFont = 'MaterialIcons';

fs.readdir(fontsDir, (err, files) => {
  if (err) {
    console.error('❌ Erreur en lisant le dossier des polices :', err.message);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(fontsDir, file);
    if (
      path.extname(file) === '.ttf' &&
      !file.startsWith('MaterialIcons') &&
      !file.startsWith('FontAwesome5')
    ) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`❌ Impossible de supprimer ${file}:`, err.message);
        } else {
          console.log(`🗑️ Supprimé : ${file}`);
        }
      });
    }
  });
});