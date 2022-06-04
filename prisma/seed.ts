import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "ellis@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("newpassword", 10);

  const user = await prisma.user.create({
    data: {
      email,
      isAdmin: true,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "100% Motorcross Goggles",
      price: 10000,
      image:
        "https://res.cloudinary.com/dlfvfc8i3/image/upload/v1646923829/Screen_Shot_2022-03-10_at_7.50.15_AM.png",
    },
  });

  await prisma.product.create({
    data: {
      name: "KTM 50",
      price: 100000,
      image:
        "https://res.cloudinary.com/dlfvfc8i3/image/upload/v1646923770/Screen_Shot_2022-03-10_at_7.46.30_AM.png",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
