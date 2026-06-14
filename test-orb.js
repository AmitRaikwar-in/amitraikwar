const fs = require('fs');
const content = fs.readFileSync(
  'src/screens/mainFlow/CoverContent/CoverContent.tsx',
  'utf-8',
);
console.log(content.substring(0, 100));
