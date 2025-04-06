import { Schema } from 'mongoose'
import { z } from 'zod'

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export interface Task {
  id?: number
  title: string
  description?: string
  completed: boolean
  dueDate?: Date
  priority: Priority
  createdAt: Date
  updatedAt: Date
}

export interface TaskFilters {
  status?: boolean
  priority?: string[]
}

export const CreateTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000).optional(),
  dueDate: z.coerce.date().optional(),
  priority: z.enum([Priority.Low, Priority.Medium, Priority.High])
})

export type UpdateTodoDto = {
  title?: string
  description?: string
  completed?: boolean
  dueDate?: Date
  priority?: Priority
}

export const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  priority: { type: String, enum: Object.values(Priority) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
