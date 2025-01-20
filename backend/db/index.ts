import { Sequelize } from "sequelize"
const url = process.env.DATABASE_URL
const sequelize = new Sequelize(`${url}`, {
  dialect: 'postgres', protocol: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit on failure
  });
