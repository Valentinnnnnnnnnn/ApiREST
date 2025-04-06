import swaggerJSDoc from 'swagger-jsdoc'
export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'API pour gérer les tâches'
    }
  },
  apis: ['./src/models/tasks/task.routes.ts']
})
