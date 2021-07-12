import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, '99b6274fae574454dd7b8580c031e158') as IPayload

    req.user_id = sub

    return next()
  } catch (err) {
    return res.status(401).end()
  }
}