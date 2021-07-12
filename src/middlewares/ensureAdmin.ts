import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepositories'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req

  console.log(user_id)

  const repository = getCustomRepository(UsersRepository)

  const { is_admin: isAdmin } = await repository.findOne(user_id)

  if (isAdmin) {
    return next()
  }

  return res.status(401).json({
    error: 'Unauthorized',
  })
}