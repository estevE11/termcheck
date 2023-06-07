import pkg from '@next/env';
const { loadEnvConfig } = pkg;
import { createClient } from "@libsql/client";
loadEnvConfig(process.cwd());
console.log("Connecting to: " + process.env.TURSO_URL);

const client = createClient({
    url: process.env.TURSO_URL as string,
    authToken: process.env.TURSO_DB_TOKEN as string
});

async function execute(query: string) {
    console.log("query: " + query);
    try {
        const rs = await client.execute(query);
        return rs;
    } catch (e) {
        console.error(e);
        return e;
    }
}

async function dropTables() {
    await execute("drop table todo")
}

async function createTables() {
    await execute(`
        create table todo (
            id integer primary key autoincrement,
            name varchar(50),
            date datetime,
            done integer default 0
        )
    `);

    await execute(`
        create table users (
            id integer primary key autoincrement,
            username varchar(30),
            password varchar(30),
            admin integer default 0
        )
    `);
}

async function populate() {
    await execute("insert into todo (name, date) values ('Maricon', '2023-06-01 11:30:34')")
    await execute("insert into todo (name, date) values ('Bujarra', '2023-05-01 11:30:34')")
}

async function run() {
    return new Promise(async (resolve, reject) => {
        await dropTables();
        await createTables();
        await populate();

        const rs: any = await execute(`
            SELECT *
            FROM todo
            WHERE datetime(date) >= datetime('now', '-4 days');
        `);
        console.log(rs.rows);
        resolve(200);
    });
}

run().then(() => {process.exit()});