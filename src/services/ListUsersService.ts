import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepositories'
import { classToPlain } from 'class-transformer'

class ListUsersService {
  async execute() {
    const repository = getCustomRepository(UsersRepository)
    const users = repository.find()
    return classToPlain(users)
  }
}

export { ListUsersService }