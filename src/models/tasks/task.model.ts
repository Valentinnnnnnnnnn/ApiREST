import { Schema } from 'mongoose';

enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
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

export type CreateTaskDto = {
    title: string
    description?: string
    dueDate?: Date
    priority: Priority
}

export type UpdateTodoDto = {
    title?: string
    description?: string
    completed?: boolean
    dueDate?: Date
    priority?: Priority
}

export const taskSchema = new Schema<Task>({
    id: { type: Number },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: { type: String, enum: Object.values(Priority)},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})