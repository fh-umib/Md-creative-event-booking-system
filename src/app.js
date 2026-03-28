const express = require('express');
const cors = require('cors');

const authRoutes = require('./ui/routes/authRoutes');
const bookingRoutes = require('./ui/routes/bookingRoutes');
const packageRoutes = require('./ui/routes/packageRoutes');
const mascotRoutes = require('./ui/routes/public/mascotRoutes');
const errorMiddleware = require('./ui/middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MD Creative API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/mascots', mascotRoutes);

app.use(errorMiddleware);

module.exports = app;
