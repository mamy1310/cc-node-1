import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../app.js";

const woods = [
  { name: "Épicéa", type: "softwood", hardness: "tender" },
  { name: "Pin", type: "softwood", hardness: "medium_hard" },
  { name: "Padouk", type: "exotic_wood", hardness: "hard" },
  { name: "Érable", type: "noble_and_hardwoods", hardness: "medium_hard" },
  { name: "Hêtre", type: "noble_and_hardwoods", hardness: "medium_hard" },
  { name: "Itauba", type: "exotic_wood", hardness: "hard" },
  { name: "Douglas", type: "softwood", hardness: "tender" },
] as const;

async function main() {
  const seededWoods = await Promise.all(
    woods.map((wood) =>
      prisma.wood.upsert({
        where: { name: wood.name },
        update: {},
        create: wood,
      }),
    ),
  );

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "mamitiana.rakoto@example.com" },
    update: { password: hashedPassword },
    create: {
      firstName: "Mamitiana",
      lastName: "Rakoto",
      email: "mamitiana.rakoto@example.com",
      password: hashedPassword,
    },
  });

  console.log({ user, woods: seededWoods });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
