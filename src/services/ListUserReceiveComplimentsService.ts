import { getCustomRepository } from 'typeorm'
import { ComplimentsRepository } from '../repositories/ComplimentsRepository'

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const repository = getCustomRepository(ComplimentsRepository)

    const compliments = await repository.find({
      where: {
        user_receiver: user_id
      },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliments
  }
}

export { ListUserReceiveComplimentsService }