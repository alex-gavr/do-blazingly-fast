import { char, mysqlEnum, mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';

export const webVitals = mysqlTable('web_vitals', {
  id: varchar('id', { length: 50 }).primaryKey(),
  geo: char('geo', { length: 2 }).default('??').notNull(),
  pathname: varchar('pathname', { length: 100 }).notNull(),
  name: mysqlEnum('vital_name', ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']),
  value: smallint('vital_value').notNull(),
  rating: mysqlEnum('rating', ['good', 'needs-improvement', 'poor']),
  delta: smallint('delta'),
  navigationType: mysqlEnum('navigation_type', ['navigate', 'reload', 'back-forward', 'back-forward-cache', 'prerender', 'restore']),
  lang: char('lang', { length: 2 }).default('??').notNull(),
});
