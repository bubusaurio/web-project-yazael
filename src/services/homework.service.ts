import { ObjectId } from 'mongoose'
import Homeworks from '../models/homework.model'
import { Homework, HomeworkModel } from '../types/homework.type'
import boom from '@hapi/boom'
import { User, UserModel } from '../types/user.type';
import Users from '../models/user.model';

class HomeworkService {
    async create(homework: Homework, userId: ObjectId) {
        
        const newHomework = await Homeworks.create({...homework, user: userId}).catch((error) => {
            console.log('Could not save category', error)
        })

        const existingHomework = await this.findById((newHomework as any).id)

        return existingHomework.populate([{ path: 'user', strictPopulate: false }])
    }

    async findAll() {
        const homeworks = await Homeworks.find().
        populate([{ path: 'user', strictPopulate: false }]).
        catch((error) => {
            console.log('Error while connecting to the DB', error)
        })

        if (!homeworks) {
            throw boom.notFound('There are not categories')
        }

        return homeworks
    }

    async findFirst() {
        const homeworks = await Homeworks.find().
        populate([{ path: 'user', strictPopulate: false }]).
        catch((error) => {
            console.log('Error while connecting to the DB', error)
        })

        if (!homeworks) {
            throw boom.notFound('There are not categories')
        }

        return homeworks[0]
    }


    async findById(id: string) {
        const homework = await Homeworks.findById(id).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })

        if(!homework) {
            throw boom.notFound('Category not found')
        }

        return homework
    }

    async findByName(name: string) {
        const homework = await Homeworks.findOne({name}).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })

        if (!homework) {
            throw boom.notFound('Category not found')
        }
    }

    async changeStatus(name: string, status: string){
        const homework = await Homeworks.findOne({ name }).catch((error) => {
            console.log('Error while connecting to the DB', error);
        });

        if (!homework) {
            throw boom.notFound('Homework not found');
        }

        // Update the status of the homework
        homework.status = status;

        // Save the updated homework
        const updatedHomework = await homework.save().catch((error) => {
            console.log('Error while updating the homework', error);
            throw boom.badImplementation('Error while updating the homework');
        });

        return updatedHomework;
    }
}


export default HomeworkService