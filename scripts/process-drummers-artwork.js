const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processArtwork() {
  const src = 'C:/Users/USER/.gemini/antigravity-ide/brain/8fa7315a-a8e5-4dd8-a697-c1f594a9da28/.user_uploaded/media_1792423942511.jpg';
  console.log('Processing uploaded artwork:', src);

  // 1. Clean crop inside frame
  const cropBox = { left: 84, top: 46, width: 465, height: 302 };
  const { data, info } = await sharp(src)
    .extract(cropBox)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Inpaint the 11px sticker in the bottom right corner with adjacent grass
  const width = info.width;
  for (let y = 285; y < info.height; y++) {
    for (let x = 415; x < info.width; x++) {
      const sourceX = x - 55;
      const targetIdx = (y * width + x) * 3;
      const sourceIdx = (y * width + sourceX) * 3;
      data[targetIdx] = data[sourceIdx];
      data[targetIdx + 1] = data[sourceIdx + 1];
      data[targetIdx + 2] = data[sourceIdx + 2];
    }
  }

  // 2. Brighten, saturate, enhance contrast & upscale to 8K (3840 x 2493)
  const enhancedCanvas = await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
    .modulate({ brightness: 1.14, saturation: 1.18 })
    .linear(1.06, -(128 * 0.06))
    .resize(3840, 2493, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5, m1: 1.2, m2: 0.8 })
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toBuffer();

  const outCanvasPath1 = path.resolve('public/images/hero/artwork-african-drummers.jpg');
  const outCanvasPath2 = path.resolve('public/images/catalogue/ceremonial-african-drummers.jpg');
  fs.writeFileSync(outCanvasPath1, enhancedCanvas);
  fs.writeFileSync(outCanvasPath2, enhancedCanvas);
  console.log('  [OK] Saved 8K canvas crop to:', outCanvasPath1);

  // 3. Process the in-situ room photo from upload (upscale, brighten, sharpen)
  const enhancedInSitu = await sharp(src)
    .modulate({ brightness: 1.12, saturation: 1.16 })
    .linear(1.05, -(128 * 0.05))
    .resize(2560, 1920, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.4, m1: 1.1, m2: 0.75 })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toBuffer();

  const outRoomPath1 = path.resolve('public/images/hero/hero-african-drummers.jpg');
  const outRoomPath2 = path.resolve('public/images/catalogue/ceremonial-african-drummers-room.jpg');
  fs.writeFileSync(outRoomPath1, enhancedInSitu);
  fs.writeFileSync(outRoomPath2, enhancedInSitu);
  console.log('  [OK] Saved in-situ room photo to:', outRoomPath1);
}

processArtwork().catch(err => {
  console.error(err);
  process.exit(1);
});
