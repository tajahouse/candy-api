// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/candy.db3'
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds'},
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
};
