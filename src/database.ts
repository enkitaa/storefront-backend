import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

let client: Pool;
if (ENV == "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_PASSWORD,
    user: POSTGRES_USER,
    password: POSTGRES_DB
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_PASSWORD,
    user: POSTGRES_USER,
    password: POSTGRES_TEST_DB
  });
}

export default client;