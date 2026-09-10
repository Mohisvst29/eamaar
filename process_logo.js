import fs from 'fs';
import path from 'path';

const srcPath = 'c:/Users/mohma/OneDrive/Desktop/stitch_lamsat_emaar_renovation_decor/_8/screen.png';
const publicDir = 'c:/Users/mohma/OneDrive/Desktop/stitch_lamsat_emaar_renovation_decor/public';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, path.join(publicDir, 'logo.png'));
  console.log('Logo successfully copied to public/logo.png!');
} else {
  console.error('Source logo file not found');
}
