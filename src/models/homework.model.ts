import { Schema, model } from 'mongoose'
import { Homework, HomeworkModel } from '../types/homework.type'
import { USER_REFERENCE } from './user.model'

export const HOMEWORK_REFERENCE = 'Homework'

const Homeworks = new Schema<Homework, HomeworkModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    subject: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    dateAssignment: {
        type: String,
        required: false,
        trim: true
    },
    deadline: {
        type: String,
        required: false,
        trim: true
    },
    status:{
        type: String,
        required: false,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: USER_REFERENCE
    }
})

export default model(HOMEWORK_REFERENCE, Homeworks)