import {connect, connection, disconnect} from 'mongoose';
import {DB_CONFIG} from "../config";

export async function connectToDb() {
    const {host, port, name} = DB_CONFIG;
    const url = `${host}:${port}/${name}`;

    await connect(url);
}

export async function disconnectFromDB() {
    await disconnect();
}

export async function dropDatabase(dbName: string) {
    await connection.dropDatabase();
}
