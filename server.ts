import app from './app';
import { config } from 'dotenv';
import { connectRedis, disconnectRedis } from './src/utils/redisClient';

config();

const PORT = process.env.PORT;

connectRedis();

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
	await disconnectRedis();
	process.exit(0);
});

process.on('SIGTERM', async () => {
	await disconnectRedis();
	process.exit(0);
});
