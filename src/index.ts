import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import * as prism from './generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const app = new Hono()
const adapter = new PrismaPg({ connectionString });
const prisma = new prism.PrismaClient({ adapter });

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'joe@example.com',
    },
  })

  console.log(user)
}


serve({
  fetch: app.fetch,
  port: 4000
}, async (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
  try {
    await main()
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
  await prisma.$disconnect();

})


// index.ts
// Query your database using the Prisma Client






