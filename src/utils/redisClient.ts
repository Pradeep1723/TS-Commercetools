import Redis from 'ioredis';

const redisPassword = process.env.REDIS_PASSWORD;
const redisClient = new Redis({
	host: '127.0.0.1',
	port: 6379,
	password: redisPassword
});

redisClient.on('connect', () => {
	console.log('Connected to redis');
});

redisClient.on('error', (error: Error) => {
	console.error(`Redis error while connecting: ${error}`);
});

const connectRedis = async () => {
	try {
		await redisClient.connect();
	} catch (error) {
		console.error('Failed to connect to Redis:', error);
	}
};

const disconnectRedis = async () => {
	try {
		await redisClient.quit();
		console.log('Redis connection closed.');
	} catch (error) {
		console.error('Failed to close Redis connection:', error);
	}
};

export { redisClient, connectRedis, disconnectRedis };
