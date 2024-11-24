import express from 'express'
import * as Path from 'node:path'
import cors from 'cors'
import tasksRouter from './routes/tasks'

const server = express()

// Middleware
server.use(express.json())

// CORS for development
if (process.env.NODE_ENV !== 'production') {
  server.use(cors())
}

// API Routes
server.use('/api/v1/tasks/', tasksRouter)

// Static files for production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something went wrong!' })
})

export default server