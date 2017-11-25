// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user:     'root',
      password: 'qq2w3e4r',
      database: 'projectm'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'projectm',
      user:     'root',
      password: 'qq2w3e4r'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
