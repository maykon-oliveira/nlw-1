import Knex from 'knex';

export const seed = async (knex: Knex) => {
    return knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas', image: 'pilhas.svg' },
        { title: 'Baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papeis_papelao.svg' },
        { title: 'Resíduos Eletrônicos', image: 'residuos_eletronicos.svg' },
        { title: 'Resíduos Orgânicos', image: 'residuos_organicos.svg' },
        { title: 'Oléo de Cozinha', image: 'oleo.svg' },
    ]);
};
