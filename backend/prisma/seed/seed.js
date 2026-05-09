import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const books = [
  {
    title: "The Orchard Beyond Winter",
    author: "Lena Armitage",
    genre: "Fiction",
    description: "A grieving pianist returns to her childhood town and uncovers a hidden orchard where every tree carries a family secret.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    totalCopies: 7,
    availableCopies: 5,
  },
  {
    title: "The Clockmaker's Cipher",
    author: "Damian Kerr",
    genre: "Mystery",
    description: "When an antique clock stops at the exact moment of a murder, a quiet watchmaker is pulled into a puzzle of coded engravings.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
    totalCopies: 6,
    availableCopies: 2,
  },
  {
    title: "Harbor of Letters",
    author: "Nora Velas",
    genre: "Romance",
    description: "Two strangers begin exchanging letters through a forgotten postbox by the sea and find courage to rewrite their futures.",
    coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80",
    totalCopies: 8,
    availableCopies: 0,
  },
  {
    title: "Starlight and Gravity",
    author: "Dr. Imran Hale",
    genre: "Science",
    description: "A lively exploration of black holes, time dilation, and the science that turns impossible ideas into measurable truth.",
    coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
    totalCopies: 5,
    availableCopies: 4,
  },
  {
    title: "Empire at River's Bend",
    author: "Clara Min",
    genre: "History",
    description: "Through diaries and battlefield maps, this narrative traces the rise and fracture of a river kingdom over three generations.",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    totalCopies: 4,
    availableCopies: 1,
  },
  {
    title: "Systems in Motion",
    author: "Rajiv Patel",
    genre: "Technology",
    description: "From distributed systems to AI safety, this practical guide explains how modern software infrastructure is built and maintained.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    totalCopies: 9,
    availableCopies: 6,
  },
  {
    title: "In the Footsteps of Aster",
    author: "Mina Cortez",
    genre: "Biography",
    description: "The intimate life of explorer Aster Quinn, told through journals, interviews, and the difficult choices behind public legend.",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=900&q=80",
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    title: "Crown of Emberglass",
    author: "S. T. Rowan",
    genre: "Fantasy",
    description: "A reluctant heir must master forbidden firecraft before rival houses awaken an ancient weapon buried beneath the capital.",
    coverImage: "https://images.unsplash.com/photo-1455885666463-9c6821ffdb51?auto=format&fit=crop&w=900&q=80",
    totalCopies: 10,
    availableCopies: 0,
  },
  {
    title: "Learning by Lantern",
    author: "Prof. Halim Noor",
    genre: "Education",
    description: "A human-centered handbook on teaching critical thinking, collaboration, and curiosity across classrooms of every size.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
    totalCopies: 7,
    availableCopies: 7,
  },
  {
    title: "Glass City Protocol",
    author: "Evelyn Sato",
    genre: "Technology",
    description: "A near-future thriller about surveillance architecture, ethical hacking, and one engineer trying to shut down a weaponized platform.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    totalCopies: 6,
    availableCopies: 2,
  },
  {
    title: "Rain Over Red Market",
    author: "Tobias Reed",
    genre: "Mystery",
    description: "A missing ledger, a midnight market, and a detective forced to solve the case before dawn to prevent a political scandal.",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: "The Warmth Between Pages",
    author: "Elise Moreau",
    genre: "Fiction",
    description: "Inside a fading neighborhood library, four unlikely friends rediscover purpose, family, and the stories that saved them.",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
    totalCopies: 8,
    availableCopies: 4,
  },
];

async function main() {
  await prisma.borrowRecord.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();
  await prisma.book.createMany({ data: books });
  console.log(`Seeded ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
