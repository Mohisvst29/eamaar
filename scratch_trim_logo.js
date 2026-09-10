import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = './public/logo.png';
const outputPath = './public/logo.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function () {
    const width = this.width;
    const height = this.height;

    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const alpha = this.data[idx + 3];
        if (alpha > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log(`Bounding box: X=[${minX}, ${maxX}], Y=[${minY}, ${maxY}]`);
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    console.log(`Cropped dimensions: ${cropWidth}x${cropHeight}`);

    const cropped = new PNG({ width: cropWidth, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const srcIdx = (width * (minY + y) + (minX + x)) << 2;
        const dstIdx = (cropWidth * y + x) << 2;
        cropped.data[dstIdx] = this.data[srcIdx];
        cropped.data[dstIdx + 1] = this.data[srcIdx + 1];
        cropped.data[dstIdx + 2] = this.data[srcIdx + 2];
        cropped.data[dstIdx + 3] = this.data[srcIdx + 3];
      }
    }

    cropped.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Trimmed logo saved successfully to public/logo.png');
    });
  });
