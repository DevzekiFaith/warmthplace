const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function buildIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
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

async function main() {
  const sourcePath = path.resolve(process.cwd(), "public/images/hero/artwork-african-drummers.jpg");
  if (!fs.existsSync(sourcePath)) {
    console.error("Source artwork not found:", sourcePath);
    process.exit(1);
  }

  const meta = await sharp(sourcePath).metadata();
  console.log(`Source dimensions: ${meta.width} x ${meta.height}`);

  // Calculate centered square crop
  const cropSize = meta.height; // 2493
  const cropLeft = Math.round((meta.width - cropSize) / 2);
  const cropTop = 0;

  console.log(`Cropping square: left=${cropLeft}, top=${cropTop}, size=${cropSize}`);

  // Base cropped square buffer
  const squareBase = sharp(sourcePath)
    .extract({ left: cropLeft, top: cropTop, width: cropSize, height: cropSize })
    .modulate({
      brightness: 1.05,
      saturation: 1.15,
    });

  // Generate 512x512 master icon
  const icon512 = await squareBase
    .clone()
    .resize(512, 512, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.8, m1: 1.2, m2: 0.5 })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Generate 192x192
  const icon192 = await squareBase
    .clone()
    .resize(192, 192, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.7, m1: 1.2, m2: 0.5 })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Generate 180x180 (Apple Touch Icon)
  const icon180 = await squareBase
    .clone()
    .resize(180, 180, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.7, m1: 1.2, m2: 0.5 })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Generate 64x64, 48x48, 32x32, 16x16 for ICO
  const icon64 = await squareBase.clone().resize(64, 64, { kernel: "lanczos3" }).png().toBuffer();
  const icon48 = await squareBase.clone().resize(48, 48, { kernel: "lanczos3" }).png().toBuffer();
  const icon32 = await squareBase.clone().resize(32, 32, { kernel: "lanczos3" }).sharpen({ sigma: 0.6, m1: 1.5, m2: 0.8 }).png().toBuffer();
  const icon16 = await squareBase.clone().resize(16, 16, { kernel: "lanczos3" }).sharpen({ sigma: 0.8, m1: 2.0, m2: 1.0 }).png().toBuffer();

  // Build multi-res ICO
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: icon16 },
    { width: 32, height: 32, buffer: icon32 },
    { width: 48, height: 48, buffer: icon48 },
    { width: 64, height: 64, buffer: icon64 },
  ]);

  // Destination paths
  const targets = [
    { file: "public/icon.png", buf: icon512 },
    { file: "public/apple-touch-icon.png", buf: icon180 },
    { file: "public/favicon.ico", buf: icoBuffer },
    { file: "public/favicon-32x32.png", buf: icon32 },
    { file: "public/favicon-16x16.png", buf: icon16 },
    { file: "public/images/brand/artwork-icon.png", buf: icon512 },
    { file: "public/images/brand/warmthplace-emblem-circle.png", buf: icon512 },
    { file: "app/icon.png", buf: icon512 },
    { file: "app/apple-icon.png", buf: icon180 },
    { file: "app/favicon.ico", buf: icoBuffer },
  ];

  for (const t of targets) {
    const full = path.resolve(process.cwd(), t.file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, t.buf);
    console.log(`[OK] Saved ${t.file} (${t.buf.length} bytes)`);
  }

  console.log("All art icons generated successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
