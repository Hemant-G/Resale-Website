import express from 'express'
import 'dotenv/config'
import './config/db.js'
import scooterRoutes from './routes/scooterRoutes.js'
import authRoutes from './routes/authRoutes.js'
import passport from './config/passport.config.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'
console.log('NODE_ENV:', process.env.NODE_ENV);

// variables
const app = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

// middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));
app.use(express.json())

app.use(passport.initialize())
app.use('/api/scooters', scooterRoutes)
app.use('/api/auth', authRoutes)


// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
