import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

function resolveDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;

  if (!envUrl) {
    const defaultPrismaPath = path.resolve(process.cwd(), "prisma/dev.db");
    return `file:${defaultPrismaPath}`;
  }

  // Handle SQLite file URLs
  if (envUrl.startsWith("file:")) {
    const rawPath = envUrl.slice("file:".length);

    // If already absolute, return as-is
    if (path.isAbsolute(rawPath)) {
      return envUrl;
    }

    const cleanRel = rawPath.replace(/^\.\//, "");
    const inPrisma = path.resolve(/*turbopackIgnore: true*/ process.cwd(), "prisma", cleanRel);
    const inCwd = path.resolve(/*turbopackIgnore: true*/ process.cwd(), cleanRel);

    if (fs.existsSync(inPrisma)) {
      return `file:${inPrisma}`;
    }
    if (fs.existsSync(inCwd)) {
      return `file:${inCwd}`;
    }

    return `file:${inPrisma}`;
  }

  return envUrl;
}

const resolvedDatabaseUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = resolvedDatabaseUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedDatabaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
