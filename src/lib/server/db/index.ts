import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@server/db/schema"
import { env } from '$env/dynamic/private';
import fs from 'node:fs';


if(!fs.existsSync("_munbun_")) fs.mkdirSync("_mydb_")
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);
const db = drizzle(client, { schema });

export default db;