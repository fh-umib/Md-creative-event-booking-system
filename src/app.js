const express = require('express');
const cors = require('cors');

const authRoutes = require('./ui/routes/authRoutes');

const bookingRoutes = require('./ui/routes/public/bookingRoutes');
const bookingFlowRoutes = require('./ui/routes/public/bookingFlowRoutes');
const packageRoutes = require('./ui/routes/public/packageRoutes');
const mascotRoutes = require('./ui/routes/public/mascotRoutes');
const reviewRoutes = require('./ui/routes/public/reviewRoutes');

const bookingAdminRoutes = require('./ui/routes/admin/bookingAdminRoutes');

const errorMiddleware = require('./ui/middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MD Creative API is running');
});

app.use('/api/auth', authRoutes);

app.use('/api/bookings', bookingRoutes);
app.use('/api/booking-flow', bookingFlowRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/mascots', mascotRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/admin/bookings', bookingAdminRoutes);

app.use(errorMiddleware);

module.exports = app;