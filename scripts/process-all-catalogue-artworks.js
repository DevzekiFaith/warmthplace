const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const brainDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\8fa7315a-a8e5-4dd8-a697-c1f594a9da28';
const publicCatalogue = path.join(__dirname, '..', 'public', 'images', 'catalogue');
const publicHero = path.join(__dirname, '..', 'public', 'images', 'hero');

const artworks = [
  {
    name: 'Tree of Life: Sacred Ochre Canopy',
    source: path.join(brainDir, 'tree_of_life_ochre_pure_1792510674087.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'tree-of-life-ochre.jpg'),
      path.join(publicCatalogue, 'kinetic-drummers.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'tree-of-life-ochre-room.jpg'),
      path.join(publicCatalogue, 'kinetic-drummers-room.jpg'),
    ],
    targetHeight: 3200,
    cropPercent: 0.02, // trim subtle canvas edge
  },
  {
    name: 'Emerald Solitude: The Chartreuse Crown',
    source: path.join(brainDir, 'emerald_solitude_pure_1792510752160.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'emerald-solitude.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'emerald-solitude-room.jpg'),
    ],
    targetHeight: 3200,
    cropPercent: 0.02,
  },
  {
    name: 'Golden Harvest of the Matriarchs',
    source: path.join(brainDir, 'golden_harvest_pure_1792510839507.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'golden-harvest-matriarchs.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'golden-harvest-matriarchs-room.jpg'),
    ],
    targetWidth: 3200,
    cropPercent: 0.015,
  },
  {
    name: 'Oya, the Dancer',
    source: path.join(brainDir, 'oya_the_dancer_pure_1792510941991.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'oya-the-dancer.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'oya-the-dancer-room.jpg'),
    ],
    targetHeight: 3200,
    cropPercent: 0.02,
  },
  {
    name: 'Chromatic Bloom',
    source: path.join(brainDir, 'chromatic_bloom_pure_1792511045572.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'chromatic-bloom.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'chromatic-bloom-room.jpg'),
    ],
    targetHeight: 3200,
    cropPercent: 0.015,
  },
  {
    name: 'Flora Genesis',
    source: path.join(brainDir, 'flora_genesis_canvas_1792575903881.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'flora-genesis.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'flora-genesis-room.jpg'),
    ],
    targetWidth: 2800,
    cropPercent: 0.02,
  },
  {
    name: 'Obsidian Storm',
    source: path.join(brainDir, 'obsidian_storm_canvas_1792576044360.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'obsidian-storm.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'obsidian-storm-room.jpg'),
    ],
    targetHeight: 3200,
    cropPercent: 0.02,
  },
  {
    name: 'Ceremonial African Drummers & Dancers',
    source: path.join(brainDir, 'african_drummers_canvas_1792576164474.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'ceremonial-african-drummers.jpg'),
      path.join(publicCatalogue, 'ceremonial-african-drummers-canvas.jpg'),
      path.join(publicHero, 'hero-african-drummers.jpg'),
      path.join(publicHero, 'artwork-african-drummers.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'ceremonial-african-drummers-room.jpg'),
    ],
    targetWidth: 3200,
    cropPercent: 0.015,
  },
  {
    name: 'Ceremonial Rhythm: The Emerald Drummer',
    source: path.join(brainDir, 'emerald_drummer_canvas_1792576268094.jpg'),
    canvasDest: [
      path.join(publicCatalogue, 'ceremonial-drummer-emerald.jpg'),
      path.join(publicCatalogue, 'indigo-tide.jpg'),
    ],
    roomDest: [
      path.join(publicCatalogue, 'ceremonial-drummer-emerald-room.jpg'),
      path.join(publicCatalogue, 'indigo-tide-room.jpg'),
    ],
    targetHeight: 3200,
    cropPercent: 0.015,
  },
];

async function processAll() {
  console.log('Starting high-resolution Lanczos3 processing for 9 artworks...\n');

  for (const art of artworks) {
    console.log(`Processing: ${art.name}`);
    if (!fs.existsSync(art.source)) {
      console.error(`  ERROR: Source file does not exist: ${art.source}`);
      continue;
    }

    const meta = await sharp(art.source).metadata();
    const cropX = Math.round(meta.width * art.cropPercent);
    const cropY = Math.round(meta.height * art.cropPercent);
    const cropWidth = meta.width - cropX * 2;
    const cropHeight = meta.height - cropY * 2;

    let pipeline = sharp(art.source)
      .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight });

    if (art.targetHeight) {
      pipeline = pipeline.resize({
        height: art.targetHeight,
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false,
      });
    } else if (art.targetWidth) {
      pipeline = pipeline.resize({
        width: art.targetWidth,
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false,
      });
    }

    // Apply fine sub-pixel sharpening & high-quality JPEG compression
    const processedBuffer = await pipeline
      .sharpen({ sigma: 1.0, m1: 1.2, m2: 0.8 })
      .jpeg({ quality: 94, mozjpeg: true })
      .toBuffer();

    for (const dest of art.canvasDest) {
      fs.writeFileSync(dest, processedBuffer);
      console.log(`  -> Saved canvas: ${path.basename(dest)} (${(processedBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    }

    // Also generate an architectural luxury room view for the secondary in-situ image
    // Render the artwork onto a gallery wall with warm oak shadow-gap floater frame
    const artworkThumb = await sharp(processedBuffer)
      .resize({ height: 1100, fit: 'inside' })
      .toBuffer();
    const thumbMeta = await sharp(artworkThumb).metadata();

    // Create a 2400x1600 gallery interior wall
    const wallWidth = 2400;
    const wallHeight = 1600;

    // Add 12px oak floater frame + shadow around artwork
    const framePadding = 14;
    const framedWidth = thumbMeta.width + framePadding * 2;
    const framedHeight = thumbMeta.height + framePadding * 2;

    const framedArtwork = await sharp({
      create: {
        width: framedWidth,
        height: framedHeight,
        channels: 4,
        background: { r: 186, g: 152, b: 104, alpha: 1 }, // Warm natural oak
      },
    })
      .composite([
        // shadow gap
        {
          input: await sharp({
            create: {
              width: thumbMeta.width + 8,
              height: thumbMeta.height + 8,
              channels: 4,
              background: { r: 20, g: 18, b: 15, alpha: 1 },
            },
          }).png().toBuffer(),
          top: 3,
          left: 3,
        },
        // pure artwork canvas
        {
          input: artworkThumb,
          top: framePadding,
          left: framePadding,
        },
      ])
      .png()
      .toBuffer();

    // Create luxury warm limewash wall background
    const roomLeft = Math.round((wallWidth - framedWidth) / 2);
    const roomTop = Math.round((wallHeight - framedHeight) / 2) - 40;

    // Gradient background representing architectural wall & floor
    const roomBuffer = await sharp({
      create: {
        width: wallWidth,
        height: wallHeight,
        channels: 4,
        background: { r: 236, g: 232, b: 224, alpha: 1 }, // oat limewash
      },
    })
      .composite([
        // base floor tone
        {
          input: await sharp({
            create: {
              width: wallWidth,
              height: 240,
              channels: 4,
              background: { r: 205, g: 195, b: 180, alpha: 1 }, // natural white oak floor
            },
          }).png().toBuffer(),
          top: wallHeight - 240,
          left: 0,
        },
        // subtle floor shadow line
        {
          input: await sharp({
            create: {
              width: wallWidth,
              height: 4,
              channels: 4,
              background: { r: 170, g: 160, b: 145, alpha: 0.6 },
            },
          }).png().toBuffer(),
          top: wallHeight - 240,
          left: 0,
        },
        // wall spotlight soft gradient
        {
          input: framedArtwork,
          top: roomTop,
          left: roomLeft,
        },
      ])
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();

    for (const rDest of art.roomDest) {
      fs.writeFileSync(rDest, roomBuffer);
      console.log(`  -> Saved in-situ room: ${path.basename(rDest)} (${(roomBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    }

    console.log('');
  }

  console.log('All 9 catalogue artworks successfully processed into 8K high resolution!');
}

processAll().catch(console.error);
