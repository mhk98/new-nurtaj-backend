// connect to database
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require("sequelize");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,  // Use host from environment variable
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000,  // Add acquire timeout (default 60s)
    },
    // logging: process.env.NODE_ENV !== 'production',  // Enable logging only in non-prod
    logging: false,
    timezone: "+06:00",  // Timezone
    port: process.env.DB_PORT || 3306, // Optionally use the DB_PORT from env
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
