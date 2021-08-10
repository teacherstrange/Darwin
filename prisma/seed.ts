import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  // ======= Seed db
  const ben = await prisma.user.create({
    data: {
      username: "Ben wolf",
      email: "ben@wolf.com",
      password: "$2a$10$k2rXCFgdmO84Vhkyb6trJ.oH6MYLf141uTPf81w04BImKVqDbBivi",
      posts: {
        create: [
          {
            title: "Learn C",
            content: "An introduction to C programming language",
            published: false,
          },
        ],
      },
    },
  });

  const lucy = await prisma.user.create({
    data: {
      username: "Lucy Snow",
      email: "lucy@snow.com",
      password: "$2a$10$lTlNdIBQvCho0BoQg21KWu/VVKwlYsGwAa5r7ctOV41EKXRQ31ING",
      posts: {
        create: [
          {
            title: "Basic Data structure and algorithms",
            content: "An introduction to data structure and algorithms",
            published: false,
          },
          {
            title: "Learn Typescript",
            content: "Everyone should learn Typescript",
            published: false,
          },
        ],
      },
    },
  });

  console.log({ ben, lucy });
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
