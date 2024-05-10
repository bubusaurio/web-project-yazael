import express from 'express'
import HomeworkRouter from './homework.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import cors from 'cors'

const routerApi = (app) => {
  const router = express.Router()
  app.use(cors())
  app.use('/api/v1', router)
  router.use('/homeworks', HomeworkRouter)
  router.use('/users', UserRouter)
  router.use('/auth', AuthRouter)
}

export default routerApi
