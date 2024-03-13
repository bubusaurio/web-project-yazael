import { Schema, model } from 'mongoose'
import { Homework, HomeworkModel } from '../types/homework.type'

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
    }
})

export default model('Homework', Homeworks)