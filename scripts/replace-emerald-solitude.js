const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const brainDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\8fa7315a-a8e5-4dd8-a697-c1f594a9da28';
const publicCatalogue = path.join(__dirname, '..', 'public', 'images', 'catalogue');
const sourceFile = path.join(brainDir, 'indigo_queen_canvas_1792580579179.jpg');

async function main() {
  console.log('Processing Sovereign Grace: The Indigo Queen into 8K resolution...');

  const meta = await sharp(sourceFile).metadata();
  const cropX = Math.round(meta.width * 0.015);
  const cropY = Math.round(meta.height * 0.015);
  const cropWidth = meta.width - cropX * 2;
  const cropHeight = meta.height - cropY * 2;

  // 1. Process 3200px high-res pure canvas
  const canvasBuffer = await sharp(sourceFile)
    .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
    .resize({ height: 3200, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.0, m1: 1.2, m2: 0.8 })
    .jpeg({ quality: 94, mozjpeg: true })
    .toBuffer();

  const canvasDest = path.join(publicCatalogue, 'emerald-solitude.jpg');
  const canvasAltDest = path.join(publicCatalogue, 'sovereign-grace-indigo-queen.jpg');
  fs.writeFileSync(canvasDest, canvasBuffer);
  fs.writeFileSync(canvasAltDest, canvasBuffer);
  console.log(`Saved pure canvas: ${path.basename(canvasDest)} (${(canvasBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

  // 2. Generate in-situ room mockup
  const artworkThumb = await sharp(canvasBuffer)
    .resize({ height: 1100, fit: 'inside' })
    .toBuffer();
  const thumbMeta = await sharp(artworkThumb).metadata();

  const wallWidth = 2400;
  const wallHeight = 1600;
  const framePadding = 14;
  const framedWidth = thumbMeta.width + framePadding * 2;
  const framedHeight = thumbMeta.height + framePadding * 2;

  const framedArtwork = await sharp({
    create: {
      width: framedWidth,
      height: framedHeight,
      channels: 4,
      background: { r: 186, g: 152, b: 104, alpha: 1 }, // Warm natural oak frame
    },
  })
    .composite([
      {
        input: await sharp({
          create: {
            width: thumbMeta.width + 8,
            height: thumbMeta.height + 8,
            channels: 4,
            background: { r: 20, g: 18, b: 15, alpha: 1 }, // Shadow gap
          },
        }).png().toBuffer(),
        top: 3,
        left: 3,
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
  const roomTop = Math.round((wallHeight - framedHeight) / 2) - 40;

  const roomBuffer = await sharp({
    create: {
      width: wallWidth,
      height: wallHeight,
      channels: 4,
      background: { r: 236, g: 232, b: 224, alpha: 1 }, // Oat limewash
    },
  })
    .composite([
      {
        input: await sharp({
          create: {
            width: wallWidth,
            height: 240,
            channels: 4,
            background: { r: 205, g: 195, b: 180, alpha: 1 }, // White oak floor
          },
        }).png().toBuffer(),
        top: wallHeight - 240,
        left: 0,
      },
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
      {
        input: framedArtwork,
        top: roomTop,
        left: roomLeft,
      },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const roomDest = path.join(publicCatalogue, 'emerald-solitude-room.jpg');
  const roomAltDest = path.join(publicCatalogue, 'sovereign-grace-indigo-queen-room.jpg');
  fs.writeFileSync(roomDest, roomBuffer);
  fs.writeFileSync(roomAltDest, roomBuffer);
  console.log(`Saved in-situ room: ${path.basename(roomDest)} (${(roomBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

  // 3. Update database record
  const prisma = new PrismaClient();
  const product = await prisma.product.findUnique({
    where: { slug: 'emerald-solitude' },
  });

  if (product) {
    await prisma.productImage.deleteMany({
      where: { productId: product.id },
    });

    await prisma.product.update({
      where: { id: product.id },
      data: {
        title: 'Sovereign Grace: The Indigo Queen',
        description: 'A breathtaking museum-grade portrait celebrating regal African matriarchy, ancestral sovereignty, and sacred adornment. Rendered in exquisite profile, an African queen is adorned in an elaborate sculptural indigo-dyed adire headwrap interwoven with cowrie shells and delicate molten gold filigree. Her royal garments flow in layered cobalt, deep violet, and burnt sienna with thick, sculpted palette-knife impasto and shimmering gold leaf accents against an amber ground etched with ancient geometric glyphs. Hand-signed recto and verso by Nkem Agbo with studio provenance certificate.',
        medium: 'Oil, heavy-body impasto, natural mineral indigo, and 24k gold leaf on stretched Belgian linen, natural oak floating frame',
        materials: 'Belgian linen, artist oils & acrylics, 24k gold leaf foil, natural oak floater frame',
        widthCm: 75,
        heightCm: 140,
        depthCm: 5.0,
        orientation: 'PORTRAIT',
        images: {
          create: [
            {
              url: '/images/catalogue/emerald-solitude.jpg',
              alt: 'Sovereign Grace: The Indigo Queen pure oil impasto canvas by Nkem Agbo',
              position: 0,
            },
            {
              url: '/images/catalogue/emerald-solitude-room.jpg',
              alt: 'Sovereign Grace: The Indigo Queen displayed in luxury gallery interior',
              position: 1,
            },
          ],
        },
      },
    });
    console.log("Updated product in database: 'Sovereign Grace: The Indigo Queen'");
  }

  // Synchronize SQLite files
  const prismaDb = path.join(__dirname, '..', 'prisma', 'dev.db');
  const rootDb = path.join(__dirname, '..', 'dev.db');
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log('Synchronized prisma/dev.db -> dev.db');
  }

  await prisma.$disconnect();
  console.log('Replacement complete!');
}

main().catch(console.error);
