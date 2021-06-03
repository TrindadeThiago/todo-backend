import { getRepository } from "typeorm";
import Task from "../models/Task";

interface Request {
  id: string
}

export default class DeleteTaskService {
  public async execute({ id }: Request): Promise<void> {
    const taskRepository = getRepository(Task)

    const taskExists = taskRepository.findOne(id)

    if (!taskExists) {
      throw new Error('Task does not exists')
    }

    await taskRepository.delete(id)
  }
}
