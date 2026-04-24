import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'dotenv/config'
import * as prism from './generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import candidateRoutes from './routes/internal/candidates.js';
import candidatePublicRoutes from './routes/public/candidates.js';
import jobRoutes from './routes/internal/jobs.js';
import jobPublicRoutes from './routes/public/jobs.js';

const connectionString = process.env.DATABASE_URL;
const port = Number(process.env.PORT ?? 4000)
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
const app = new Hono()
const adapter = new PrismaPg({ connectionString });
const prisma = new prism.PrismaClient({ adapter });

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) {
        return allowedOrigins[0] ?? ""
      }

      return allowedOrigins.includes(origin) ? origin : ""
    },
    allowMethods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "x-api-key"]
  })
)

app.route("/n8n", candidateRoutes)
app.route("/ui/candidates", candidatePublicRoutes) // For simplicity, using the same routes for UI and internal. In a real app, these would likely be different and have different authentication/authorization logic.
app.route("/n8n/jobs", jobRoutes)
app.route("/ui/jobs", jobPublicRoutes)


app.use("*", async (c, next) => {
  if (c.req.method === "OPTIONS") {
    return next()
  }

  const apiKey = c.req.header("x-api-key")

  if (apiKey !== process.env.N8N_API_KEY) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  await next()
})



serve({
  fetch: app.fetch,
  port
}, async (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
  try {
    await prisma.$connect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }

})


// index.ts
// Query your database using the Prisma Client




