module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.data/database.sqlite3'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
