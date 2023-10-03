const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require('cors');
const User = require('./models/user');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Sync Sequelize models with the database
sequelize.sync({ alter: false, }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Login route
const authRouter = require('./routes/auth.router');
const doctorRouter = require('./routes/doctor.router');
const slotRouter = require('./routes/slot.router');
const slotBookingRouter = require('./routes/slotBooking');
const { authenticateToken } = require('./middlewares/auth');

app.use('/auth', authRouter);

app.use(authenticateToken)

app.use('/doctor', doctorRouter);
app.use('/slot', slotRouter);
app.use('/book', slotBookingRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
