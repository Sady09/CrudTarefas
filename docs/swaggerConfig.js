// docs/swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

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
        url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3333}`,
      },
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
