import { resolve } from 'path';
import Knex from 'knex';

const test: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, '..', 'database', 'database.sqlite'),
    },
    useNullAsDefault: true,
};

const development: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, '..', 'database', 'database.sqlite'),
    },
    useNullAsDefault: true,
};

export default {
    test,
    development,
};
