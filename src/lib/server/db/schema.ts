import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from "@paralleldrive/cuid2"
import { sql } from 'drizzle-orm';

export const SIMPLEAUTH = sqliteTable('simpleAuth', {
	id: text("id").primaryKey().$defaultFn(()=>createId()).unique().notNull(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	craete_at: text("create_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),	
});

export const PROJECT = sqliteTable('project', {
	id: text("id").primaryKey().$defaultFn(()=>createId()).notNull().unique(),
	name: text("name").notNull(),
	description: text("description"),
	api_key: text("api_key").$defaultFn(()=> [createId(), createId(), createId()].join(".")).notNull(),
	create_at: text("create_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updated_at: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
})

export const FLAG = sqliteTable("flag", {
	id: text("id").references(() => PROJECT.id).unique().notNull(),
	name: text("name").notNull(),
	development: integer('development', {mode:"boolean"}).default(true),
	production: integer('production', {mode:"boolean"}).default(true),
	note: text("note"),
	show_note: integer("show_note",{mode:"boolean"}).default(true).notNull(),
})