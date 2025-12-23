import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.PSQL_DATABASE as string,
  process.env.PSQL_USERNAME as string,
  process.env.PSQL_PASSWORD as string,
  {
    host: process.env.PSQL_HOST,
    port: Number(process.env.PSQL_PORT) || 5432,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected via Sequelize!");
    await sequelize.sync({ alter: true });
    console.log("All models synced!");
  } catch (err) {
    console.error("Sequelize connection error:", err);
  }
};
