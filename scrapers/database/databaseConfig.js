import 'dotenv/config';

const PORT = process.env.PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

export default {
    DATABASE_NAME,
    PORT,
    USER,
    PASSWORD
}