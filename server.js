require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/sequelize');
const authRoutes = require('./routes/auth.routes');
const meetingScheduleRoutes = require('./routes/meetingSchedule.routes');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Update CORS configuration to be more permissive during development
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true, // Allow credentials
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Make sure body parser is configured
app.use(express.json({ limit: '10mb' })); // Increase payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test database connection
db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/project-scopes', require('./routes/projectScope.routes'));
app.use('/api/project-scope-tasks', require('./routes/projectScopeTask.routes'));
app.use('/api/meeting-schedules', meetingScheduleRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SiramsX API' });
});

// Improved global error handler with more details
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  console.error('Error stack:', err.stack);
  console.error('Request path:', req.path);
  console.error('Request body:', req.body);
  
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
