const sharp = require('c:/Users/USER/Desktop/arthome/warmthplace/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'C:/Users/USER/.gemini/antigravity/brain/4d334f09-0712-4e6e-bf03-a4d06de4786c/.user_uploaded';
const sourceFile = path.join(uploadsDir, 'media_1793735554173_cc8693a0.jpg');
const outDir = 'c:/Users/USER/Desktop/arthome/warmthplace/public/images/catalogue';

const slug = 'maternal-devotion-emerald-mosaic';

async function run() {
  console.log(`Processing ${slug}...`);
  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  const meta = await sharp(sourceFile).metadata();
  console.log(`Source dimensions: ${meta.width} x ${meta.height}`);

  // 1. Process 2400px high-resolution pure artwork canvas
  const targetHeight = 2400;
  const targetWidth = Math.round((meta.width / meta.height) * targetHeight);

  const canvasBuffer = await sharp(sourceFile)
    .resize(targetWidth, targetHeight, { kernel: sharp.kernel.lanczos3 })
    .modulate({ brightness: 1.04, saturation: 1.05 })
    .sharpen({ sigma: 0.8, m1: 1.1, m2: 0.5 })
    .jpeg({ quality: 94, mozjpeg: true })
    .toBuffer();

  const mainDest = path.join(outDir, `${slug}.jpg`);
  const canvasDest = path.join(outDir, `${slug}-canvas.jpg`);
  fs.writeFileSync(mainDest, canvasBuffer);
  fs.writeFileSync(canvasDest, canvasBuffer);
  console.log(`[OK] Saved pure canvas: ${mainDest} (${(canvasBuffer.length / 1024).toFixed(1)} KB)`);

  // 2. Generate luxury gallery in-situ room mockup
  const artworkThumb = await sharp(canvasBuffer)
    .resize({ height: 1100, fit: 'inside' })
    .toBuffer();
  const thumbMeta = await sharp(artworkThumb).metadata();

  const wallWidth = 2400;
  const wallHeight = 1600;
  const framePadding = 18;
  const framedWidth = thumbMeta.width + framePadding * 2;
  const framedHeight = thumbMeta.height + framePadding * 2;

  // Floater frame with shadow
  const framedArtwork = await sharp({
    create: {
      width: framedWidth,
      height: framedHeight,
      channels: 4,
      background: { r: 24, g: 22, b: 20, alpha: 1 }, // Slim matte obsidian / dark timber frame
    },
  })
    .composite([
      {
        input: await sharp({
          create: {
            width: thumbMeta.width + 10,
            height: thumbMeta.height + 10,
            channels: 4,
            background: { r: 180, g: 150, b: 105, alpha: 1 }, // Subtle warm gold/oak inner lip
          },
        }).png().toBuffer(),
        top: 4,
        left: 4,
      },
      {
        input: await sharp({
          create: {
            width: thumbMeta.width + 4,
            height: thumbMeta.height + 4,
            channels: 4,
            background: { r: 10, g: 10, b: 10, alpha: 1 }, // Reveal shadow gap
          },
        }).png().toBuffer(),
        top: 7,
        left: 7,
      },
      {
        input: artworkThumb,
        top: framePadding,
        left: framePadding,
      },
    ])
    .png()
    .toBuffer();

  const roomLeft = Math.round((wallWidth - framedWidth) / 2);
  const roomTop = Math.round((wallHeight - framedHeight) / 2) - 60;

  // Background room: warm oat textured gallery wall + white oak hardwood floor
  const floorHeight = 280;
  const baseboardHeight = 22;

  const roomBuffer = await sharp({
    create: {
      width: wallWidth,
      height: wallHeight,
      channels: 4,
      background: { r: 238, g: 234, b: 226, alpha: 1 }, // Premium oat limewash gallery wall
    },
  })
    .composite([
      // Natural light gradient wash from top left
      {
        input: await sharp({
          create: {
            width: wallWidth,
            height: wallHeight - floorHeight,
            channels: 4,
            background: { r: 245, g: 242, b: 236, alpha: 0.4 },
          },
        }).png().toBuffer(),
        top: 0,
        left: 0,
      },
      // Floor baseboard
      {
        input: await sharp({
          create: {
            width: wallWidth,
            height: baseboardHeight,
            channels: 4,
            background: { r: 224, g: 218, b: 208, alpha: 1 },
          },
        }).png().toBuffer(),
        top: wallHeight - floorHeight - baseboardHeight,
        left: 0,
      },
      // Hardwood floor
      {
        input: await sharp({
          create: {
            width: wallWidth,
            height: floorHeight,
            channels: 4,
            background: { r: 198, g: 186, b: 168, alpha: 1 }, // Warm natural oak plank floor
          },
        }).png().toBuffer(),
        top: wallHeight - floorHeight,
        left: 0,
      },
      // Baseboard shadow line
      {
        input: await sharp({
          create: {
            width: wallWidth,
            height: 3,
            channels: 4,
            background: { r: 160, g: 148, b: 132, alpha: 0.6 },
          },
        }).png().toBuffer(),
        top: wallHeight - floorHeight,
        left: 0,
      },
      // Artwork cast shadow (diffuse bottom-right)
      {
        input: await sharp({
          create: {
            width: framedWidth + 30,
            height: framedHeight + 35,
            channels: 4,
            background: { r: 35, g: 30, b: 25, alpha: 0.18 },
          },
        }).png().toBuffer(),
        top: roomTop + 14,
        left: roomLeft + 12,
      },
      // Framed artwork
      {
        input: framedArtwork,
        top: roomTop,
        left: roomLeft,
      },
    ])
    .jpeg({ quality: 93, mozjpeg: true })
    .toBuffer();

  const roomDest = path.join(outDir, `${slug}-room.jpg`);
  fs.writeFileSync(roomDest, roomBuffer);
  console.log(`[OK] Saved in-situ room: ${roomDest} (${(roomBuffer.length / 1024).toFixed(1)} KB)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

