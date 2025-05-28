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
const allowedOrigins = [
  'https://resale-website.vercel.app',
  'http://localhost:5173', 
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
}

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
