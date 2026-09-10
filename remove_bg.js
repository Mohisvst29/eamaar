import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const logoPath = 'c:/Users/mohma/OneDrive/Desktop/stitch_lamsat_emaar_renovation_decor/public/logo.png';

fs.createReadStream(logoPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width;
    let minY = this.height;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        
        // Checkerboard gray/white pattern detection
        const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
        const brightness = (r + g + b) / 3;

        if (diff < 20 && brightness > 150) {
          // Transparent
          this.data[idx + 3] = 0;
        } else {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Crop around logo
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    const cropped = new PNG({ width: cropWidth, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const srcIdx = (this.width * (y + minY) + (x + minX)) << 2;
        const dstIdx = (cropWidth * y + x) << 2;
        cropped.data[dstIdx] = this.data[srcIdx];
        cropped.data[dstIdx + 1] = this.data[srcIdx + 1];
        cropped.data[dstIdx + 2] = this.data[srcIdx + 2];
        cropped.data[dstIdx + 3] = this.data[srcIdx + 3];
      }
    }

    cropped.pack().pipe(fs.createWriteStream(logoPath))
      .on('finish', () => {
        console.log(`Clean transparent logo saved to ${logoPath} (${cropWidth}x${cropHeight}px)`);
      });
  });
