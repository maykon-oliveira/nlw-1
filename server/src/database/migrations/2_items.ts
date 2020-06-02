import Knex from 'knex';

export const up = async (knex: Knex) => {
    return knex.schema.createTable('items', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable('items');
};
