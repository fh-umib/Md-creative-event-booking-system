require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
//Testimi per databaze
// const pool = require('./src/config/db');

// pool.connect()
//   .then(() => console.log("Database connected"))
//   .catch(err => console.error("Database error:", err));