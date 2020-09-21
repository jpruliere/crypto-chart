require('dotenv').config();

const { Client } = require('pg');

const faker = require('faker');

const db = new Client();

(async () => {
    await db.connect();

    await db.query('TRUNCATE TABLE account CASCADE;');

    for (let index = 0; index < 100; index++) {
        await db.query('INSERT INTO account (account_number, owner_name) VALUES ($1, $2);', [faker.finance.account(), faker.name.findName()]);
    }

    for (let index = 0; index < 10000; index++) {
        await db.query(`
            WITH randomclient AS (SELECT id FROM account ORDER BY random() LIMIT 1)
            INSERT INTO "transaction" (account_id, "date", amount)
            SELECT randomclient.id, $1, $2
            FROM randomclient;
        `, [faker.date.past(2), faker.finance.amount()]);
    }

    await db.query('UPDATE transaction SET amount = -amount WHERE random() > .5;');

    console.log("done");
})();