const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("Processing Royal Gazelles artwork and room mockup...");

  const rawCanvasPath = "C:/Users/USER/.gemini/antigravity-ide/brain/8fa7315a-a8e5-4dd8-a697-c1f594a9da28/royal_gazelles_canvas_1792504774903.jpg";
  const rawRoomPath = "C:/Users/USER/.gemini/antigravity-ide/brain/8fa7315a-a8e5-4dd8-a697-c1f594a9da28/royal_gazelles_room_1792505007381.jpg";

  // 1. Process Canvas
  // Source is 1264 x 848. Bottom text starts around y=808.
  // We crop top: 0, left: 0, width: 1264, height: 806 to remove all text cleanly.
  const croppedCanvas = sharp(rawCanvasPath)
    .extract({ left: 0, top: 0, width: 1264, height: 806 });

  // Upscale to 8K width (3840 x 2449) with high-fidelity Lanczos3 and unsharp mask
  const upscaledCanvas = await croppedCanvas
    .resize(3840, 2449, { kernel: "lanczos3" })
    .modulate({ brightness: 1.03, saturation: 1.08 })
    .sharpen({ sigma: 0.8, m1: 1.2, m2: 0.4 })
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer();

  const canvasTargets = [
    "public/images/catalogue/canopy-and-grace-canvas.jpg",
    "public/images/catalogue/royal-gazelles-twilight.jpg",
    "public/images/catalogue/white-stags-twilight.jpg",
  ];

  for (const t of canvasTargets) {
    const fullPath = path.resolve(process.cwd(), t);
    fs.writeFileSync(fullPath, upscaledCanvas);
    console.log(`[OK] Saved canvas target: ${t} (${upscaledCanvas.length} bytes)`);
  }

  // 2. Process In-Situ Room Mockup
  // Source is 1376 x 1032. Upscale to 2560 x 1920 ultra high-res
  const processedRoom = await sharp(rawRoomPath)
    .resize(2560, 1920, { kernel: "lanczos3" })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.6, m1: 1.0, m2: 0.3 })
    .jpeg({ quality: 94, mozjpeg: true })
    .toBuffer();

  const roomTargets = [
    "public/images/catalogue/canopy-and-grace.jpg",
    "public/images/catalogue/canopy-and-grace-room.jpg",
    "public/images/catalogue/white-stags-twilight-room.jpg",
    "public/images/hero/artwork-abstract-canvas.jpg",
  ];

  for (const t of roomTargets) {
    const fullPath = path.resolve(process.cwd(), t);
    fs.writeFileSync(fullPath, processedRoom);
    console.log(`[OK] Saved room mockup target: ${t} (${processedRoom.length} bytes)`);
  }

  console.log("Finished processing Royal Gazelles images!");
}

main().catch(console.error);
