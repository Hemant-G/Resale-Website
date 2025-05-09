import express from 'express'
import 'dotenv/config'
import './config/db.js'
import scooterRoutes from './routes/scooterRoutes.js'
import authRoutes from './routes/authRoutes.js'
import passport from './config/passport.config.js'

// variables
const app = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

// middleware
app.use(express.json())
app.use(passport.initialize())
app.use('/api/scooters', scooterRoutes)
app.use('/api/auth', authRoutes)

// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
