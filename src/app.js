const express = require('express');
const cors = require('cors');

const authRoutes = require('./ui/routes/authRoutes');

const bookingRoutes = require('./ui/routes/public/bookingRoutes');
const bookingFlowRoutes = require('./ui/routes/public/bookingFlowRoutes');
const packageRoutes = require('./ui/routes/public/packageRoutes');
const mascotRoutes = require('./ui/routes/public/mascotRoutes');
const reviewRoutes = require('./ui/routes/public/reviewRoutes');
const decorationRoutes = require('./ui/routes/public/decorationRoutes');
const activityRoutes = require('./ui/routes/public/activityRoutes');

const bookingAdminRoutes = require('./ui/routes/admin/bookingAdminRoutes');
const adminDecorationRoutes = require('./ui/routes/admin/adminDecorationRoutes');
const adminPackageRoutes = require('./ui/routes/admin/adminPackageRoutes');
const mascotAdminRoutes = require('./ui/routes/admin/adminMascotRoutes');
const activityAdminRoutes = require('./ui/routes/admin/adminActivityRoutes');

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
app.use('/api/decorations', decorationRoutes);
app.use('/api/activities', activityRoutes);

app.use('/api/admin/bookings', bookingAdminRoutes);
app.use('/api/admin/decorations', adminDecorationRoutes);
app.use('/api/admin/packages', adminPackageRoutes);
app.use('/api/admin/mascots', mascotAdminRoutes);
app.use('/api/admin/activities', activityAdminRoutes);

app.use(errorMiddleware);

module.exports = app;