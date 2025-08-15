// docs/swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoList API',
      version: '1.0.0',
      description: 'API para gerenciamento de tarefas com autenticação JWT'
    },
    servers: [
      {
        url: 'http://localhost:3333', // altere para o link do deploy depois
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js'], // Lê os comentários das rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
