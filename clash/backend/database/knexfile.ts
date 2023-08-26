const dbConfig = {
  client: 'pg',
  connection: {
    database: process.env.DB_NAME || 'mtg',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.PGPASS,
  },
  useNullAsDefault: true,
};

export default dbConfig;
