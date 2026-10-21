const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(item.width === 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height === 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((i) => i.buffer)]);
}

async function generateWarmthplaceIcons() {
  const brandDir = path.resolve(process.cwd(), 'public/images/brand');
  // Use warmthplace-emblem-circle.png or warmthplace-emblem-badge.png
  let source = path.join(brandDir, 'warmthplace-emblem-badge.png');
  if (!fs.existsSync(source)) {
    source = path.join(brandDir, 'warmthplace-emblem-circle.png');
  }

  console.log('Using source for Warmthplace logo favicon:', source);

  // For high-res (512x512)
  const icon512 = await sharp(source)
    .resize(512, 512, { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toBuffer();

  // For Apple Touch Icon (180x180)
  const icon180 = await sharp(source)
    .resize(180, 180, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.6, m1: 1.2, m2: 0.5 })
    .png({ quality: 100 })
    .toBuffer();

  // For 64x64, 48x48
  const icon64 = await sharp(source)
    .resize(64, 64, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.7, m1: 1.3, m2: 0.5 })
    .png()
    .toBuffer();

  const icon48 = await sharp(source)
    .resize(48, 48, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.7, m1: 1.4, m2: 0.5 })
    .png()
    .toBuffer();

  // For 32x32 and 16x16: enhance contrast so gold monogram stands out sharply in browser tabs
  const icon32 = await sharp(source)
    .resize(32, 32, { kernel: 'lanczos3' })
    .modulate({ brightness: 1.02, saturation: 1.25 })
    .sharpen({ sigma: 0.8, m1: 2.0, m2: 0.8 })
    .png()
    .toBuffer();

  const icon16 = await sharp(source)
    .resize(16, 16, { kernel: 'lanczos3' })
    .modulate({ brightness: 1.0, saturation: 1.35 })
    .sharpen({ sigma: 0.9, m1: 2.5, m2: 1.0 })
    .png()
    .toBuffer();

  // Build multi-res ICO
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: icon16 },
    { width: 32, height: 32, buffer: icon32 },
    { width: 48, height: 48, buffer: icon48 },
    { width: 64, height: 64, buffer: icon64 },
  ]);

  const targets = [
    { file: 'public/favicon.ico', buf: icoBuffer },
    { file: 'app/favicon.ico', buf: icoBuffer },
    { file: 'public/favicon-32x32.png', buf: icon32 },
    { file: 'public/favicon-16x16.png', buf: icon16 },
    { file: 'public/icon.png', buf: icon512 },
    { file: 'app/icon.png', buf: icon512 },
    { file: 'public/apple-touch-icon.png', buf: icon180 },
    { file: 'app/apple-icon.png', buf: icon180 },
  ];

  for (const t of targets) {
    const fullPath = path.resolve(process.cwd(), t.file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, t.buf);
    console.log(`Updated ${t.file} (${t.buf.length} bytes)`);
  }

  console.log('All Warmthplace browser logo icons generated successfully!');
}

generateWarmthplaceIcons().catch(console.error);
