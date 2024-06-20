import express from 'express'
import HomeworkService from '../services/homework.service'
import { Homework } from '../types/homework.type'
import passport from 'passport'
import type { JwtRequestType, UserRequestType } from '../types/user.type'
import { ObjectId } from 'mongoose'

const router = express.Router()
const service = new HomeworkService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res) => {
    const {user: { sub } }= req
    console.log(sub)
    const homework: Homework = req.body
    const newHomework = await service.create(homework, sub as unknown as ObjectId)

    res.status(201).json(newHomework)
  }
)

// router.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   async (req: JwtRequestType, res, next) => {
//     try {
//       const { user}   = req
//       console.log(user)
//       const homeworks = await service.findAll()
//       res.status(200).json(homeworks)
//     } catch (error) {
//       console.log(error)
//       next(error)
//     }
//   }
// )

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res, next) => {
    try {
      const { sub } = req.user;
      const homeworks = await service.findByUser(sub);
      res.status(200).json(homeworks);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/findFirst',
  async (req, res, next) => {
    try {
      const homeworks = await service.findFirst();
      res.status(200).json(homeworks);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// router.get(
//   '/findFirst',
//   passport.authenticate('jwt', {session:false}),
//   async (req: JwtRequestType, res, next) => {
//     try {
//       const { user}  = req
//       console.log(user)
//       const homeworks = await service.findFirst()
//       res.status(200).json(homeworks)
//     } catch (error) {
//       console.log(error)
//       next(error)
//     }
//   }
// )

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const homework = await service.findById(req.params.id)
      res.status(200).json(homework)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:name',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const homework = await service.findByName(req.params.name)
      res.status(200).json(homework)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id/status',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const updatedHomework = await service.updateStatus(id, status);

      res.status(200).json(updatedHomework);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res, next) => {
    try {
      await service.deleteAllHomeworks();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router
