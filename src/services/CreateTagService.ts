import { getCustomRepository } from 'typeorm'
import { TagsRepository } from '../repositories/TagsRepository'

class CreateTagService {
  async execute(name: string) {
    if (!name) {
      throw new Error('Incorrect Name')
    }

    const tagsRepository = getCustomRepository(TagsRepository)

    const tagAlreadyExists = await tagsRepository.findOne({
      name
    })

    if (tagAlreadyExists) {
      throw new Error('Tag Already Exists!')
    }

    const tag = tagsRepository.create({
      name,
    })

    await tagsRepository.save(tag)

    return tag
  }
}

export { CreateTagService }