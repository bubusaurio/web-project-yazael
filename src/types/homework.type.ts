import type { Model } from 'mongoose'
import { User } from './user.type'

export type Homework = {
    id?: string
    name: string
    subject?: string
    description?: string 
    dateAssignment?: string
    deadline?: string
    status?: string
    user: User

}

export type HomeworkModel = Model<Homework>