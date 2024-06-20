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

    async deleteAllHomeworks() {
        try {
          const result = await Homeworks.deleteMany();
          return result;
        } catch (error) {
          throw new Error('Error deleting homeworks');
        }
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

    async updateStatus(id: string, status: string): Promise<any> {
        try {
          const updatedHomework = await Homeworks.findByIdAndUpdate(
            id,
            { status },
            { new: true }
          );
    
          if (!updatedHomework) {
            throw new Error('Homework not found');
          }
    
          return updatedHomework;
        } catch (error) {
          throw new Error(`Error updating homework status: ${error.message}`);
        }
    }

    async findByUser(userId: ObjectId): Promise<any[]> {
        try {
          const homeworks = await Homeworks.find({ user: userId }).populate('user');
    
          return homeworks;
        } catch (error) {
          throw new Error(`Error fetching homeworks: ${error.message}`);
        }
      }
}


export default HomeworkService