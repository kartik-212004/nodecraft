import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../.env"), override: true });

const env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_KEY: process.env.SECRET_KEY
}

export const { SECRET_KEY, DATABASE_URL, NODE_ENV, PORT } = env