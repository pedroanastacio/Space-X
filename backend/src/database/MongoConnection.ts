import mongoose from 'mongoose'

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            const connectionString = process.env.MONGO_URL || '';
            await mongoose.connect(connectionString);
            console.log('Database connected.');

        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}