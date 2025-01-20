import { Sequelize } from "sequelize"
const sequelize = new Sequelize('postgres://akhil:akhil@localhost:5432/timescale_data', {
  dialect: 'postgres',
  protocol: 'postgres',
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
