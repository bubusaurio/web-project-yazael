import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'
import bcrytp from 'bcrypt'

class UserService {
  async create(user: User) {
    const hashedPassword = await bcrytp.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Could not save user', error)
    })

    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }
    const newUserObject = newUser.toJSON()
    delete newUserObject.password
    return newUserObject
    //delete (newUser as unknown as User).password
    //return newUser
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }

    // const userObject = user.toJSON()
    // delete userObject.password
    // return userObject
    return user
  }

  async findByName(name: string) {
    const user = await Users.find({ name }).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }
}

export default UserService
