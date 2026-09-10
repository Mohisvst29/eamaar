import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/mohma/.gemini/antigravity-ide/brain/385e7720-2ad7-4879-ac3f-59e8decc6561';
const publicImgDir = 'c:/Users/mohma/OneDrive/Desktop/stitch_lamsat_emaar_renovation_decor/public/images';

if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);
files.forEach(file => {
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    const src = path.join(brainDir, file);
    const dest = path.join(publicImgDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to public/images/`);
  }
});
