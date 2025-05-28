import express from 'express'
import 'dotenv/config'
import './config/db.js'
import scooterRoutes from './routes/scooterRoutes.js'
import authRoutes from './routes/authRoutes.js'
import passport from './config/passport.config.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'

// variables
const app = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

// middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Define your allowed origins here. For example:
    const allowedOrigins = [
      'https://resale-website.vercel.app', // Your frontend URL
      'http://localhost:3000',          // For local development
      // Add other allowed origins as needed
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Important for allowing cookies with JWT (if you're using them)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Specify allowed request headers
  exposedHeaders: 'Authorization', // Specify headers you want to expose to the client (e.g., JWT in Authorization header)
};


app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json())

app.use(passport.initialize())
app.use('/api/scooters', scooterRoutes)
app.use('/api/auth', authRoutes)


// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
