import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string
  email: string
  isAdmin?: boolean
  password: string
}

class CreateUserService {
  async execute({ name, email, isAdmin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email) {
      throw new Error('Incorrect email')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      is_admin: isAdmin,
      password: passwordHash,
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }