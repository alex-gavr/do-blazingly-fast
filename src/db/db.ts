import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

// create the connection
const connection = connect({
  host: import.meta.env.PUBLIC_DATABASE_HOST,
  username: import.meta.env.PUBLIC_DATABASE_USERNAME,
  password: import.meta.env.PUBLIC_DATABASE_PASSWORD,
});

export const db = drizzle(connection);
