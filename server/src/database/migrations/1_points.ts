import Knex from 'knex';

export const up = async (knex: Knex) => {
    return knex.schema.createTable('points', (table) => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('lat').notNullable();
        table.decimal('lng').notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable('points');
};
