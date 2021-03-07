import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sequelize = new Sequelize(process.env.DB_URI as string);
// const sequelize = new Sequelize("postgres://iMac@localhost:5432/");
// const sequelize = new Sequelize("marketsite", "postgres", "cicEiPmFMsj4AnP6", {
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 1000,
//   },
//   host: "35.223.208.45",
// });
try {
  sequelize.authenticate();
  console.log("\x1b[32m%s\x1b[0m", "Successfully connected to db.");
} catch (error) {
  console.error(error);
}
export { sequelize };
