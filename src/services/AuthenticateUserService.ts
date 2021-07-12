import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepositories'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({
      email
    })

    if (!user) {
      throw new Error("Incorrect email/password")
    }

    const isCorrectPassword = await compare(password, user.password)

    if (!isCorrectPassword) {
      throw new Error("Incorrect email/password")
    }

    // todo: put secret on ambient variable 
    const token = sign(
      {
        email: user.email
      },
      "99b6274fae574454dd7b8580c031e158",
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}

export { AuthenticateUserService }