import { Hono } from 'hono'
import { Sequelize } from 'sequelize';
const app = new Hono()
const url = process.env.DATABASE_URL;

const sequelize = new Sequelize(`${url}`, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

let tradesData = sequelize.define('trades', {
  coinPair: { type: Sequelize.STRING, primaryKey: true },
  time: { type: Sequelize.DATE, primaryKey: true },
  price: { type: Sequelize.DECIMAL },
  quantity: { type: Sequelize.DECIMAL }
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit on failure
  });
export default app
