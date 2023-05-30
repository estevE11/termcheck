import { createClient } from "@libsql/client";

export default function connect() {
    return createClient({
        url: process.env.TURSO_URL as string,
        authToken: process.env.TURSO_DB_TOKEN as string
    });
}
