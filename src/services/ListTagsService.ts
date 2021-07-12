import { getCustomRepository } from 'typeorm'
import { TagsRepository } from '../repositories/TagsRepository'
import { classToPlain } from 'class-transformer'

class ListTagsService {
  async execute() {
    const repository = getCustomRepository(TagsRepository)
    const tags = await repository.find()

    return classToPlain(tags)
  }
}

export { ListTagsService }