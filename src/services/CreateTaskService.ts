import { getRepository } from "typeorm";
import Task from "../models/Task";

interface Request {
  title: string
}

export default class CreateTaskService {
  public async execute({ title }: Request): Promise<Task> {
    const taskRepository = getRepository(Task)
    const task = taskRepository.create({ title })

    await taskRepository.save(task)

    return task
  }
}
