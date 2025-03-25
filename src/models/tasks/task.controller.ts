import { asyncHandler } from '../../shared/utils/asyncHandler';
import { Request, Response } from 'express';
import { TaskService } from './task.service';

export class TaskController {
    public static getAllTasks = asyncHandler(async (req, res) => {
        const tasks = await new TaskService().getAllTasks()
        res.status(200).json(tasks)
    })

    public static createTask = asyncHandler(async (req, res) => {
        const task = await new TaskService().createTask(req.body)
        res.status(201).json(task)
    })
}