import { Hono } from 'hono'
import { Sequelize } from 'sequelize';
const app = new Hono()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

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




app.get("/kline", async (c) => {
  try {

    const { symbol } = c.req.query()
    const data = await sequelize.query(
      `SELECT time_bucket('1 day', time) AS time,
              first(price,time) AS open,
              last(price,time) AS close,
              min(price) AS high,
              max(price) AS low
       FROM trades
       WHERE "coinPair" = :symbol
       GROUP BY time
       ORDER BY time`,
      {
        replacements: { symbol },
        type: Sequelize.QueryTypes.SELECT,
      }
    )
    return c.json({
      "message": "this is the kline data", data
    })
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to fetch kline data' }, 500);
  }
})




app.get("/trades", async (c) => {
  try {
    const { symbol } = c.req.query()
    const data = await sequelize.query(
      `SELECT FROM trades
        WHERE "coinPair" = :symbol
        ORDER BY time 
        DESC LIMIT 100`,
      {
        replacements: { symbol },
        type: Sequelize.QueryTypes.SELECT,
      }
    )
    return c.json({
      "message": "this is the trades data", data
    })
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to fetch kline data' }, 500);
  }
})





app.get("/ticker", async (c) => {
  try {
    const { symbol } = c.req.query()
    const data = await sequelize.query(
      `SELECT time_bucket('1 day',time) AS time,
              coinPair AS symbol,
              last(price,time) AS lastprice,
              first(price,time) AS firstprice,
              max(price) AS high,
              min(price) AS low,
              sum(quantity) AS totaltrade
       FROM trades
       WHERE "coinPair" = :symbol
         AND time > NOW() - INTERVAL '1 day'
       GROUP BY time`,
      {
        replacements: { symbol },
        type: Sequelize.QueryTypes.SELECT,
      }
    )
    return c.json({
      "message": "this is the ticker data", data
    })
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to fetch kline data' }, 500);
  }

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
