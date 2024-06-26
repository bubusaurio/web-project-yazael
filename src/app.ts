import express from 'express'
import mongoose from 'mongoose'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import RouterApi from './routes'
import router from './routes/homework.route'
import routerApi from './routes'
import { config } from './config/config'
import passport from 'passport'
import './utils/auth'
import cors from 'cors'

const { mongoUri, port } = config

const app = express()
app.use(express.json())

const connectDB = () => {
  mongoose.connect(mongoUri)
}

app.use(passport.initialize())
app.use(express.json())
routerApi(app)

app.get('/', (req, res) => {
  res.send('Proyecto Web Yazael')
})

app.use(cors())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  connectDB()
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
