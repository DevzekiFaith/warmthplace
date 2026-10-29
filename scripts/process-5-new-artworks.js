const sharp = require('c:/Users/USER/Desktop/arthome/warmthplace/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'C:/Users/USER/.gemini/antigravity/brain/4d334f09-0712-4e6e-bf03-a4d06de4786c/.user_uploaded';
const outDir = 'c:/Users/USER/Desktop/arthome/warmthplace/public/images/catalogue';

const items = [
  {
    slug: 'rain-on-ochre-pop-duck',
    file: 'media_1793280495066_e0bc1821.jpg',
    // 734 x 1024: frame is roughly x: 228..488, y: 222..665
    crop: { left: 233, top: 226, width: 250, height: 380 },
  },
  {
    slug: 'courtyard-tambourine-celebration',
    file: 'media_1793280495072_40cad824.jpg',
    // 1024 x 763: frame is roughly x: 238..714, y: 127..408
    crop: { left: 244, top: 132, width: 464, height: 271 },
  },
  {
    slug: 'midnight-afrobeat-saxophonist',
    file: 'media_1793280495089_67aeaf48.jpg',
    // 763 x 1024: frame is roughly x: 175..509, y: 144..597
    crop: { left: 178, top: 148, width: 328, height: 445 },
  },
  {
    slug: 'harvest-canopy-tree-of-vitality',
    file: 'media_1793280495102_c42f7bdd.jpg',
    // 1024 x 723: frame is roughly x: 400..604, y: 107..468
    crop: { left: 404, top: 111, width: 196, height: 353 },
  },
  {
    slug: 'trinity-blossoms-on-raw-jute',
    file: 'media_1793280495121_0a78e015.jpg',
    // 1024 x 682: frame is roughly x: 232..589, y: 103..462
    crop: { left: 238, top: 109, width: 345, height: 347 },
  },
];

async function run() {
  for (const item of items) {
    const src = path.join(uploadsDir, item.file);
    const roomDest = path.join(outDir, `${item.slug}-room.jpg`);
    const mainDest = path.join(outDir, `${item.slug}.jpg`);
    const canvasDest = path.join(outDir, `${item.slug}-canvas.jpg`);

    // 1. Upscale & enhance the full in-situ room image
    const meta = await sharp(src).metadata();
    const scale = 2;
    const roomBuf = await sharp(src)
      .resize(meta.width * scale, meta.height * scale, { kernel: 'lanczos3' })
      .sharpen({ sigma: 0.7, m1: 1.0, m2: 0.4 })
      .jpeg({ quality: 93, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(roomDest, roomBuf);
    fs.writeFileSync(mainDest, roomBuf);

    // 2. Extract and upscale the canvas close-up
    const canvasBuf = await sharp(src)
      .extract(item.crop)
      .resize(item.crop.width * 4, item.crop.height * 4, { kernel: 'lanczos3' })
      .sharpen({ sigma: 0.9, m1: 1.1, m2: 0.5 })
      .jpeg({ quality: 93, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(canvasDest, canvasBuf);
    console.log(`[OK] Processed ${item.slug}: room (${roomBuf.length} bytes), canvas (${canvasBuf.length} bytes)`);
  }
}

run().catch(console.error);

