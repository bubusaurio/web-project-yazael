import type { Model } from 'mongoose'

export type Homework = {
    id?: string
    name: string
    subject?: string
    description?: string 
    dateAssignment?: string
    deadline?: string

}

export type HomeworkModel = Model<Homework>