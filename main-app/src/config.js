export default {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/image_processing_system',
    rabbitmqUrl: process.env.CLOUDAMQP_URL || 'amqp://localhost',
    webhookUrl: process.env.WEBHOOK_URL || 'http://example.com/webhook',
    nodeEnv: process.env.NODE_ENV || 'development'
};