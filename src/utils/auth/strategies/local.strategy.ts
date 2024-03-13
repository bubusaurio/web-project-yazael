import { Strategy } from 'passport-local'
import UserService from '../../../services/user.service'
import { User } from '../../../types/user.type'
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'

const options = { usernameField: 'email', passwordField: 'password' }
const service = new UserService()

const LocalStrategy = new Strategy(options, async (email, password, next) => {
  try {
    const user: User = (await service.findByEmail(email)) as unknown as User
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      //console.log('ERROOOOR')
      //delete user.password
      const userObject = (user as any).toJSON()
      delete userObject.password
      if (isMatch) {
        next(null, userObject)
      } else {
        next(boom.unauthorized(), false)
      }
    } else {
      next(boom.unauthorized(), false)
      //console.log('ERRORR2')
    }
  } catch (error) {
    //console.log('ERROOOOOR3')
    next(error, false)
  }
})

export default LocalStrategy
