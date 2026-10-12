const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const prismaDir = path.join(projectRoot, "prisma");
const prismaDb = path.join(prismaDir, "dev.db");
const rootDb = path.join(projectRoot, "dev.db");

// Ensure environment variable has absolute path fallback for workers
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = `file:${prismaDb}`;
}

console.log("[prepare-db] Checking database readiness for build...");

try {
  // If prisma/dev.db doesn't exist or is tiny (< 2KB), run prisma db push
  const needsSchemaInit =
    !fs.existsSync(prismaDb) || fs.statSync(prismaDb).size < 2048;

  if (needsSchemaInit) {
    console.log("[prepare-db] Creating SQLite schema tables via prisma db push...");
    execSync("npx prisma db push --skip-generate --accept-data-loss", {
      cwd: projectRoot,
      stdio: "inherit",
      env: {
        ...process.env,
        DATABASE_URL: `file:${prismaDb}`,
      },
    });
  }

  // Ensure both prisma/dev.db and root dev.db exist and match
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
  } else if (fs.existsSync(rootDb)) {
    fs.copyFileSync(rootDb, prismaDb);
  }

  console.log("[prepare-db] Database ready for Next.js build.");
} catch (err) {
  console.warn("[prepare-db] Non-fatal notice during database prep:", err.message);
}
