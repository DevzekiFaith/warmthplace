const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function updateDb(dbPath) {
  console.log(`Updating print prices in: ${dbPath}`);
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

  try {
    const res1 = await client.product.updateMany({
      where: { slug: 'ancestral-geometry-i' },
      data: { price: 8500000 }, // ₦85,000 NGN
    });
    console.log(`Updated ancestral-geometry-i (${res1.count}) -> ₦85,000`);

    const res2 = await client.product.updateMany({
      where: { slug: 'golden-hour-crossing' },
      data: { price: 9500000 }, // ₦95,000 NGN
    });
    console.log(`Updated golden-hour-crossing (${res2.count}) -> ₦95,000`);

    const res3 = await client.product.updateMany({
      where: { slug: 'chromatic-bloom' },
      data: { price: 50000000 }, // ₦500,000 NGN
    });
    console.log(`Updated chromatic-bloom (${res3.count}) -> ₦500,000`);

    const res4 = await client.product.updateMany({
      where: { slug: 'adire-indigo-cushion' },
      data: { price: 3500000 }, // ₦35,000 NGN
    });
    console.log(`Updated adire-indigo-cushion (${res4.count}) -> ₦35,000`);
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const prismaDb = path.resolve(__dirname, '../prisma/dev.db');
  const rootDb = path.resolve(__dirname, '../dev.db');

  if (fs.existsSync(prismaDb)) {
    await updateDb(prismaDb);
  }
  if (fs.existsSync(rootDb)) {
    await updateDb(rootDb);
  }

  // Also update prisma/seed.ts
  const seedPath = path.resolve(__dirname, '../prisma/seed.ts');
  if (fs.existsSync(seedPath)) {
    let seedContent = fs.readFileSync(seedPath, 'utf8');
    seedContent = seedContent.replace(
      'price: 42000000, // ₦420,000 (Approx $280 USD)',
      'price: 8500000, // ₦85,000 NGN (Limited Edition Print)'
    );
    seedContent = seedContent.replace(
      'price: 68000000, // ₦680,000 (Approx $450 USD)',
      'price: 9500000, // ₦95,000 NGN (Fine-Art Photography Print)'
    );
    seedContent = seedContent.replace(
      'price: 50000000, // ₦500,000 (~$333 USD)',
      'price: 3500000, // ₦35,000 NGN (~$22 USD)'
    );
    fs.writeFileSync(seedPath, seedContent, 'utf8');
    console.log('Updated prisma/seed.ts');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
