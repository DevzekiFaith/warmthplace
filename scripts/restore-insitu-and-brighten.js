const sharp = require('c:/Users/USER/Desktop/arthome/warmthplace/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'C:/Users/USER/.gemini/antigravity/brain/4d334f09-0712-4e6e-bf03-a4d06de4786c/.user_uploaded';
const outDir = 'c:/Users/USER/Desktop/arthome/warmthplace/public/images/catalogue';

const uploadedItems = [
  // Batch 1
  { slug: 'rain-on-ochre-pop-duck', file: 'media_1793280495066_e0bc1821.jpg' },
  { slug: 'courtyard-tambourine-celebration', file: 'media_1793280495072_40cad824.jpg' },
  { slug: 'midnight-afrobeat-saxophonist', file: 'media_1793280495089_67aeaf48.jpg' },
  { slug: 'harvest-canopy-tree-of-vitality', file: 'media_1793280495102_c42f7bdd.jpg' },
  { slug: 'trinity-blossoms-on-raw-jute', file: 'media_1793280495121_0a78e015.jpg' },
  // Batch 2
  { slug: 'white-stags-twilight-glade', file: 'media_1793295844985_124bbad0.jpg' },
  { slug: 'tufted-companion-on-olive-jute', file: 'media_1793295845014_11b96bd0.jpg' },
  { slug: 'savannah-strata-azure-horizon', file: 'media_1793295845056_179fb4af.jpg' },
  { slug: 'royal-accord-ankara-couple', file: 'media_1793295845060_b5592ea0.jpg' },
  { slug: 'meadow-symphony-panoramic-impasto', file: 'media_1793295845061_3be4825a.jpg' },
];

async function run() {
  // 1. Process all 10 uploaded full in-situ images WITHOUT cropping/zooming, brightening them cleanly
  for (const item of uploadedItems) {
    const src = path.join(uploadsDir, item.file);
    const roomDest = path.join(outDir, `${item.slug}-room.jpg`);
    const mainDest = path.join(outDir, `${item.slug}.jpg`);
    const canvasDest = path.join(outDir, `${item.slug}-canvas.jpg`);

    const buf = await sharp(src)
      .modulate({ brightness: 1.09, saturation: 1.05 })
      .sharpen({ sigma: 0.6, m1: 0.8, m2: 0.3 })
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(roomDest, buf);
    fs.writeFileSync(mainDest, buf);
    fs.writeFileSync(canvasDest, buf);
    console.log(`[OK] Restored full in-situ & brightened: ${item.slug} (${buf.length} bytes)`);
  }

  // 2. Also gently brighten existing in-situ room images in public/images/catalogue/
  const existingRoomSlugs = [
    'canopy-and-grace-room.jpg',
    'obsidian-storm-room.jpg',
    'flora-genesis-room.jpg',
    'chromatic-bloom-room.jpg',
    'oya-the-dancer-room.jpg',
    'golden-harvest-matriarchs-room.jpg',
    'emerald-solitude-room.jpg',
    'tree-of-life-ochre-room.jpg',
    'solar-vortex-room.jpg',
    'ceremonial-african-drummers-room.jpg',
    'indigo-tide-room.jpg',
  ];

  for (const fileName of existingRoomSlugs) {
    const filePath = path.join(outDir, fileName);
    if (!fs.existsSync(filePath)) continue;
    const inputBuf = fs.readFileSync(filePath);
    const outBuf = await sharp(inputBuf)
      .modulate({ brightness: 1.07, saturation: 1.04 })
      .jpeg({ quality: 94, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(filePath, outBuf);
    console.log(`[OK] Brightened existing in-situ: ${fileName}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

