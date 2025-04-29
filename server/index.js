import express from 'express'
import 'dotenv/config'
import './config/db.js'
import scooterRoutes from './routes/scooterRoutes.js'

// variables
const app = express()
const port = process.env.PORT

// middleware
app.use(express.json())
app.use('/api/scooters', scooterRoutes)
// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})