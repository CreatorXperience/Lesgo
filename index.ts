// index.ts
// Query your database using the Prisma Client

import 'dotenv/config'
import * as prism from './src/generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new prism.PrismaClient({ adapter });

// Example query to create a user based on the example schema




