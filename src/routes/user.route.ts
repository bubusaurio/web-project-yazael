import express from 'express'
import { User, UserModel} from '../types/user.type'
import UserService from '../services/user.service'
import boom from '@hapi/boom'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res, next) => {
  try {
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

router.get('/email', async (req, res, next) => {
  try {
    const { email } = req.query
    const user = await service.findByEmail(email as string)
    console.log({ user })

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
})

router.get('/name', async (req, res, next) => {
  try {
    const { name } = req.query
    const user = await service.findByName(name as string) 
    console.log({ user })

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
})

router.get('/id', async (req, res, next) => {
  try {
    const { id } = req.query
    const user = await service.findById(id as string) 
    console.log({ user })

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
      const users = await service.findAll();
      res.status(200).json(users);
  } catch (error) {
      console.log('Error while retrieving users', error);
      res.status(500).json({ error: 'Internal Server Error' });
      next(error)
  }
})


export default router
