import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'C:/Users/mohma/.gemini/antigravity-ide/brain/385e7720-2ad7-4879-ac3f-59e8decc6561/.user_uploaded/media_1789063253904.png';
const outputPath = './public/logo.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function () {
    console.log(`Image dimensions: ${this.width}x${this.height}`);

    // Let's sample the corners (which are definitely checkerboard background)
    const samples = [];
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 30; x++) {
        const idx = (this.width * y + x) << 2;
        samples.push({ r: this.data[idx], g: this.data[idx + 1], b: this.data[idx + 2] });
      }
    }

    console.log('Sample corner pixel [0,0]:', samples[0]);
    console.log('Sample corner pixel [15,15]:', samples[15 * 30 + 15]);

    // Flood fill or threshold detection from corners
    // Let's see background pixel characteristics from corners
    // A pixel is background if:
    // 1. It is connected to the outer boundary
    // 2. Its R, G, B are nearly equal (desaturated gray/white checkerboard)
    // 3. |R - G| < 15 and |G - B| < 15 and |R - B| < 15
    // 4. Brightness > 120 (since checkerboard squares are gray ~160 and white ~200)

    const width = this.width;
    const height = this.height;
    const isBg = new Uint8Array(width * height);

    // BFS Queue from borders
    const queue = [];
    
    // Add all border pixels to queue
    for (let x = 0; x < width; x++) {
      queue.push(x, 0);
      queue.push(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      queue.push(0, y);
      queue.push(width - 1, y);
    }

    const checkBg = (x, y) => {
      const idx = (width * y + x) << 2;
      const r = this.data[idx];
      const g = this.data[idx + 1];
      const b = this.data[idx + 2];

      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      // Checkerboard pixels are gray (maxDiff < 18) and brightness > 120
      const isGray = maxDiff <= 20;
      const brightness = (r + g + b) / 3;
      return isGray && brightness >= 110;
    };

    let head = 0;
    while (head < queue.length) {
      const x = queue[head++];
      const y = queue[head++];
      const pos = y * width + x;

      if (isBg[pos]) continue;

      if (checkBg(x, y)) {
        isBg[pos] = 1;

        // Check 4 neighbors
        if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
        if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
        if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
        if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
      }
    }

    // Now apply alpha = 0 for isBg
    let bgCount = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pos = y * width + x;
        if (isBg[pos]) {
          const idx = (width * y + x) << 2;
          this.data[idx + 3] = 0; // Transparent
          bgCount++;
        }
      }
    }

    console.log(`Cleared ${bgCount} / ${width * height} pixels as background.`);

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Processed logo saved to public/logo.png');
    });
  });
