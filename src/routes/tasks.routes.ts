import { Router } from 'express'
import { getRepository } from 'typeorm'
import Task from '../models/Task'
import CreateTaskService from '../services/CreateTaskService'
import DeleteTaskService from '../services/DeleteTaskService'
import UpdateTaskService from '../services/UpdateTaskServe'

const tasksRouter = Router()

tasksRouter.get('/', async (request, response) => {
  const taskRepository = getRepository(Task)

  const tasks = await taskRepository.find()

  return response.status(200).json(tasks)
})

tasksRouter.post('/', async (request, response) => {
  const { title } = request.body

  const createTask = new CreateTaskService()

  const task = await createTask.execute({
    title
  })

  return response.status(201).json(task)
})

tasksRouter.put('/:id', async (request, response) => {

  const { done } = request.body
  const { id } = request.params

  const updateTask = new UpdateTaskService()

  const task = await updateTask.execute({
    id,
    done
  })

  return response.status(200).json(task)

})

tasksRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const deleteTask = new DeleteTaskService()

  await deleteTask.execute({ id })

  return response.status(204).send()
})

export default tasksRouter
