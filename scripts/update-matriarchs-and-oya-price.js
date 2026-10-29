const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function updateDb(dbPath) {
  console.log(`Updating database at: ${dbPath}`);
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`
      }
    }
  });

  try {
    const slugs = ['golden-harvest-matriarchs', 'oya-the-dancer'];
    for (const slug of slugs) {
      const existing = await client.product.findUnique({ where: { slug } });
      if (existing) {
        await client.product.update({
          where: { slug },
          data: {
            price: 60000000, // ₦600,000 NGN (60,000,000 kobo)
          },
        });
        console.log(`  [UPDATED] ${slug} (${existing.title}): ₦${(existing.price / 100).toLocaleString()} -> ₦600,000`);
      } else {
        console.warn(`  [WARN] ${slug} not found in ${dbPath}`);
      }
    }
  } catch (err) {
    console.error(`Error updating ${dbPath}:`, err);
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const dbs = [
    path.join(root, 'prisma', 'dev.db'),
    path.join(root, 'dev.db')
  ];

  for (const db of dbs) {
    if (fs.existsSync(db)) {
      await updateDb(db);
    }
  }
}

main().catch(console.error);

