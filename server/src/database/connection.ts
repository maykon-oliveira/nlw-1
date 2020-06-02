import knext from 'knex';
import { resolve } from 'path';

const connection = knext({
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;
