import type { InferModel } from 'drizzle-orm';
import { char, mysqlEnum, mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';

export const webVitals = mysqlTable('web_vitals', {
  id: varchar('id', { length: 50 }).primaryKey(),
  geo: char('geo', { length: 2 }).default('??').notNull(),
  pathname: varchar('pathname', { length: 100 }).notNull(),
  offer: varchar('offer', { length: 10 }).notNull().default('??'),
  hosting: mysqlEnum('hosting', ['vercel', 'cloudflare']),
  name: mysqlEnum('vital_name', ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']),
  value: smallint('vital_value').notNull(),
  rating: mysqlEnum('rating', ['good', 'needs-improvement', 'poor']),
  delta: smallint('delta'),
  navigationType: mysqlEnum('navigation_type', ['navigate', 'reload', 'back-forward', 'back-forward-cache', 'prerender', 'restore']),
  lang: char('lang', { length: 2 }).default('??').notNull(),
  browserName: varchar('browser_name', { length: 100 }).notNull().default('??'),
  browserVersion: varchar('browser_version', { length: 100 }).notNull().default('??'),
  osName: varchar('os_name', { length: 100 }).notNull().default('??'),
  osVersion: varchar('os_version', { length: 100 }).notNull().default('??'),
  deviceVendor: varchar('device_vendor', { length: 100 }).notNull().default('??'),
  deviceType: varchar('device_type', { length: 100 }).notNull().default('??'),
});

export type TWebVitals = InferModel<typeof webVitals>;
