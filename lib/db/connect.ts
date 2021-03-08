import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sequelize = new Sequelize(process.env.DB_URI as string);
// const sequelize = new Sequelize('postgres://');

try {
  sequelize.authenticate();
  console.log("\x1b[32m%s\x1b[0m", "Successfully connected to db.");
} catch (error) {
  console.error(error);
}
export { sequelize };
