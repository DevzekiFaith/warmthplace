const sharp = require('c:/Users/USER/Desktop/arthome/warmthplace/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'C:/Users/USER/.gemini/antigravity/brain/4d334f09-0712-4e6e-bf03-a4d06de4786c/.user_uploaded';
const outDir = 'c:/Users/USER/Desktop/arthome/warmthplace/public/images/catalogue';

// Proportional crop regions (0..1) of the framed artwork in each room photo:
const items = [
  {
    slug: 'white-stags-twilight-glade',
    file: 'media_1793295844985_124bbad0.jpg',
    // Artwork in center-top of room: x ~ 0.27..0.67, y ~ 0.24..0.59
    relCrop: { left: 0.272, top: 0.242, width: 0.395, height: 0.348 },
  },
  {
    slug: 'tufted-companion-on-olive-jute',
    file: 'media_1793295845014_11b96bd0.jpg',
    // Portrait frame on wall: x ~ 0.285..0.645, y ~ 0.175..0.620
    relCrop: { left: 0.292, top: 0.180, width: 0.348, height: 0.436 },
  },
  {
    slug: 'savannah-strata-azure-horizon',
    file: 'media_1793295845056_179fb4af.jpg',
    // Square canvas above sofa: x ~ 0.322..0.662, y ~ 0.160..0.588
    relCrop: { left: 0.324, top: 0.162, width: 0.336, height: 0.425 },
  },
  {
    slug: 'royal-accord-ankara-couple',
    file: 'media_1793295845060_b5592ea0.jpg',
    // Portrait frame on wall: x ~ 0.292..0.666, y ~ 0.155..0.594
    relCrop: { left: 0.296, top: 0.160, width: 0.366, height: 0.430 },
  },
  {
    slug: 'meadow-symphony-panoramic-impasto',
    file: 'media_1793295845061_3be4825a.jpg',
    // Wide panoramic frame above sofa: x ~ 0.232..0.701, y ~ 0.200..0.564
    relCrop: { left: 0.235, top: 0.204, width: 0.463, height: 0.356 },
  },
];

async function run() {
  for (const item of items) {
    const src = path.join(uploadsDir, item.file);
    const roomDest = path.join(outDir, `${item.slug}-room.jpg`);
    const mainDest = path.join(outDir, `${item.slug}.jpg`);
    const canvasDest = path.join(outDir, `${item.slug}-canvas.jpg`);

    const meta = await sharp(src).metadata();
    const w = meta.width;
    const h = meta.height;

    // 1. Upscale & enhance the full in-situ room image
    const scale = w < 1200 ? 2 : 1;
    const roomBuf = await sharp(src)
      .resize(w * scale, h * scale, { kernel: 'lanczos3' })
      .sharpen({ sigma: 0.7, m1: 1.0, m2: 0.4 })
      .jpeg({ quality: 93, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(roomDest, roomBuf);
    fs.writeFileSync(mainDest, roomBuf);

    // 2. Extract and upscale the canvas close-up
    const crop = {
      left: Math.round(w * item.relCrop.left),
      top: Math.round(h * item.relCrop.top),
      width: Math.round(w * item.relCrop.width),
      height: Math.round(h * item.relCrop.height),
    };

    const canvasBuf = await sharp(src)
      .extract(crop)
      .resize(crop.width * 3, crop.height * 3, { kernel: 'lanczos3' })
      .sharpen({ sigma: 0.9, m1: 1.1, m2: 0.5 })
      .jpeg({ quality: 93, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(canvasDest, canvasBuf);
    console.log(
      `[OK] Processed ${item.slug} (${w}x${h}): room (${roomBuf.length} bytes), canvas (${canvasBuf.length} bytes)`
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

