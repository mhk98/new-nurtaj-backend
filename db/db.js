// connect to database
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "fishnmeatdb", // DB_NAME
  "fishnmeat", // DB_USER
  "Fishnmeat@123",      // DB_PASSWORD
  {
    host: "127.0.0.1", // DB_HOST
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000, // Add acquire timeout (default 60s)
    },
    logging: false,
    timezone: "+06:00", // Timezone
    port: 3306, // MySQL default port
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
