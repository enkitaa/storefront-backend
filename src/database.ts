import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_USER,
    POSTGRES_DB,
} = process.env

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_PASSWORD,
    user: POSTGRES_USER,
    password: POSTGRES_DB
})

export default client;