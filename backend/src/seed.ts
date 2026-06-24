import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaService();

async function main() {
  const email = 'admin@theprojects.dev';
  const password = 'admin';

  console.log(`Checking if user ${email} exists...`);
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`User ${email} already exists!`);
    return;
  }

  console.log(`Hashing password...`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(`Creating user...`);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Demo user created successfully:`, user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
