const sharp = require('c:/Users/USER/Desktop/arthome/warmthplace/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'C:/Users/USER/.gemini/antigravity/brain/4d334f09-0712-4e6e-bf03-a4d06de4786c/.user_uploaded';
const outDir = 'c:/Users/USER/Desktop/arthome/warmthplace/public/images/catalogue';

// Tight interior canvas crops (excluding wall and outer frame border)
const items = [
  // Batch 1
  {
    slug: 'rain-on-ochre-pop-duck',
    file: 'media_1793280495066_e0bc1821.jpg',
    // 734 x 1024
    crop: { left: 237, top: 230, width: 242, height: 372 },
  },
  {
    slug: 'courtyard-tambourine-celebration',
    file: 'media_1793280495072_40cad824.jpg',
    // 1024 x 763
    crop: { left: 248, top: 136, width: 456, height: 263 },
  },
  {
    slug: 'midnight-afrobeat-saxophonist',
    file: 'media_1793280495089_67aeaf48.jpg',
    // 763 x 1024
    crop: { left: 184, top: 162, width: 316, height: 426 },
  },
  {
    slug: 'harvest-canopy-tree-of-vitality',
    file: 'media_1793280495102_c42f7bdd.jpg',
    // 1024 x 723
    crop: { left: 407, top: 114, width: 190, height: 347 },
  },
  {
    slug: 'trinity-blossoms-on-raw-jute',
    file: 'media_1793280495121_0a78e015.jpg',
    // 1024 x 682
    crop: { left: 246, top: 124, width: 330, height: 326 },
  },
  // Batch 2
  {
    slug: 'white-stags-twilight-glade',
    file: 'media_1793295844985_124bbad0.jpg',
    // 1024 x 723
    crop: { left: 282, top: 178, width: 398, height: 246 },
  },
  {
    slug: 'tufted-companion-on-olive-jute',
    file: 'media_1793295845014_11b96bd0.jpg',
    // 809 x 1024
    crop: { left: 246, top: 204, width: 266, height: 424 },
  },
  {
    slug: 'savannah-strata-azure-horizon',
    file: 'media_1793295845056_179fb4af.jpg',
    // 1024 x 723
    crop: { left: 334, top: 119, width: 340, height: 303 },
  },
  {
    slug: 'royal-accord-ankara-couple',
    file: 'media_1793295845060_b5592ea0.jpg',
    // 809 x 1024
    crop: { left: 248, top: 184, width: 282, height: 416 },
  },
  {
    slug: 'meadow-symphony-panoramic-impasto',
    file: 'media_1793295845061_3be4825a.jpg',
    // 1024 x 682
    crop: { left: 245, top: 147, width: 466, height: 232 },
  },
];

async function run() {
  for (const item of items) {
    const src = path.join(uploadsDir, item.file);
    const mainDest = path.join(outDir, `${item.slug}.jpg`);
    const canvasDest = path.join(outDir, `${item.slug}-canvas.jpg`);

    const canvasBuf = await sharp(src)
      .extract(item.crop)
      .resize(item.crop.width * 4, item.crop.height * 4, { kernel: 'lanczos3' })
      .sharpen({ sigma: 0.9, m1: 1.1, m2: 0.5 })
      .jpeg({ quality: 93, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(canvasDest, canvasBuf);
    fs.writeFileSync(mainDest, canvasBuf);
    console.log(`[OK] Pure canvas saved for ${item.slug} (${canvasBuf.length} bytes)`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

