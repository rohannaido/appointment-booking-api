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
sequelize.sync({ force: false, }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Login route
const authRouter = require('./routes/auth.router');
app.use('/auth', authRouter);

const doctorRouter = require('./routes/doctor.router');
app.use('/doctor', doctorRouter);

const slotRouter = require('./routes/slot.router');
app.use('/slot', slotRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
