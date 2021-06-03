import { getRepository } from "typeorm";
import Task from "../models/Task";

interface Request {
  id: string
  done: boolean
}

export default class UpdateTaskService {
  public async execute({ id, done }: Request): Promise<Task> {
    const taskRepository = getRepository(Task)

    const task = await taskRepository.findOne(id)

    if (!task) {
      throw new Error('Taks does not exists')
    }

    task.done = done
    await taskRepository.save(task)

    return task
  }
}
