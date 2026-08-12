import { Pool } from "pg";

export async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();

    console.log("Criou o pool de conexão");

    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);

    client.release();

    global.connection = pool;

    return pool.connect();
}

export async function selectClientes() {
    const client = await connect();
    const res = await client.query("SELECT * FROM CLIENTE");
    client.release();
    return res.rows;
}

export async function selectCliente(id) {
    const client = await connect();
    const res = await client.query("SELECT * FROM CLIENTE WHERE ID_CLI =$1", [id]);
    client.release();
    return res.rows;
}

connect();