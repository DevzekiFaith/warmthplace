const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateAssets() {
  const brandDir = path.join(__dirname, '../public/images/brand');
  fs.mkdirSync(brandDir, { recursive: true });
  const src = 'C:/Users/USER/.gemini/antigravity-ide/brain/c40b1c51-9282-4896-8806-f18ff34abaf5/.user_uploaded/media_1791808588303.jpg';

  // 1. Copy raw original
  fs.copyFileSync(src, path.join(brandDir, 'warmthplace-logo-full.jpg'));

  // 2. Full cropped logo (emblem + text 'WARMTHPLACE ARTS') with natural luxury linen tone
  // minX ~ 140, maxX ~ 884 (width: 744, center: 512)
  // minY ~ 210, maxY ~ 780 (height: 570)
  await sharp(src)
    .extract({ left: 112, top: 180, width: 800, height: 620 })
    .jpeg({ quality: 96 })
    .toFile(path.join(brandDir, 'warmthplace-logo.jpg'));

  // Also as PNG
  await sharp(src)
    .extract({ left: 112, top: 180, width: 800, height: 620 })
    .png()
    .toFile(path.join(brandDir, 'warmthplace-logo.png'));

  // 3. Circular emblem crop with transparent background outside the outer gold ring
  // Center is (511, 450), outer ring radius is ~ 219.
  // 480x480 square centered at (511, 450) -> left: 271, top: 210
  const emblemSquare = await sharp(src)
    .extract({ left: 271, top: 210, width: 480, height: 480 })
    .toBuffer();

  // Create circular SVG mask
  const circleMask = Buffer.from('<svg width="480" height="480"><circle cx="240" cy="240" r="236" fill="white"/></svg>');

  await sharp(emblemSquare)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toFile(path.join(brandDir, 'warmthplace-emblem-circle.png'));

  // 4. Subtle gold bordered medallion badge (for avatars, badges, seals)
  // Let's also create an icon with a crisp border
  const goldBorderSvg = Buffer.from('<svg width="480" height="480"><circle cx="240" cy="240" r="235" fill="none" stroke="#B89A65" stroke-width="3"/></svg>');
  await sharp(path.join(brandDir, 'warmthplace-emblem-circle.png'))
    .composite([{ input: goldBorderSvg, blend: 'over' }])
    .png()
    .toFile(path.join(brandDir, 'warmthplace-emblem-badge.png'));

  // 5. Clean transparent background versions of the emblem
  // Let's create an extraction where cream background is made transparent
  const emblemRaw = await sharp(emblemSquare).raw().toBuffer({ resolveWithObject: true });
  const w = emblemRaw.info.width;
  const h = emblemRaw.info.height;
  const rgba = Buffer.alloc(w * h * 4);

  // Emblem center in this 480x480 crop is (240, 240)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = emblemRaw.data[idx];
      const g = emblemRaw.data[idx + 1];
      const b = emblemRaw.data[idx + 2];

      const dx = x - 240;
      const dy = y - 240;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Outside the double ring (r > 222) should be completely transparent
      if (dist > 224) {
        rgba[(y * w + x) * 4 + 3] = 0;
        continue;
      }

      // Inside: differentiate gold and shadow from cream
      const diffRB = r - b;
      const diffGB = g - b;
      const lum = r * 0.299 + g * 0.587 + b * 0.114;

      // Cream in emblem center is ~ r: 232, g: 224, b: 214
      // Gold highlights: diffRB > 28, diffGB > 16
      // Gold shadows: lum < 190
      let alpha = 0;
      const chromaDiff = Math.max(0, diffRB - 17);
      const shadowDiff = Math.max(0, 218 - lum);

      if (chromaDiff > 3 || shadowDiff > 5) {
        const score = chromaDiff * 3.8 + shadowDiff * 2.8;
        if (score > 12) {
          alpha = Math.min(255, Math.round((score - 12) * 4));
        }
      }

      // Smooth falloff near boundary
      if (dist > 218) {
        const ringEdge = Math.max(0, 1 - (dist - 218) / 6);
        alpha = Math.round(alpha * ringEdge);
      }

      rgba[(y * w + x) * 4] = r;
      rgba[(y * w + x) * 4 + 1] = g;
      rgba[(y * w + x) * 4 + 2] = b;
      rgba[(y * w + x) * 4 + 3] = alpha;
    }
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(path.join(brandDir, 'warmthplace-emblem-transparent.png'));

  // 6. High-res Favicon and App Icon
  await sharp(path.join(brandDir, 'warmthplace-emblem-circle.png'))
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../app/icon.png'));

  await sharp(path.join(brandDir, 'warmthplace-emblem-circle.png'))
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../app/apple-icon.png'));

  await sharp(path.join(brandDir, 'warmthplace-emblem-circle.png'))
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('Successfully generated all brand logo assets!');
}

generateAssets().catch(console.error);
