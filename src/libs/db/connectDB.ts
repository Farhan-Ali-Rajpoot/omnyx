import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://midlelnight:FARHANALI6874@cluster0.nlo9rvx.mongodb.net/';
const DB_NAME = process.env.DB_NAME || 'prodpost';

const DB_CONFIG = {
    uri: MONGO_URI,
    dbName: DB_NAME,
    options: {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
    },
    retryDelay: 3000,
    maxRetries: 3,
};

let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(): Promise<typeof mongoose> {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("⚡ Using existing database connection");
        return mongoose;
    }

    if (connectionPromise) {
        console.log("🔄 Connection in progress, waiting...");
        return connectionPromise;
    }

    if (!DB_CONFIG.uri) {
        throw new Error("❌ MONGO_URI is missing in environment variables.");
    }

    console.log(`🔌 Attempting to connect to database: ${DB_CONFIG.dbName}`);

    connectionPromise = (async (): Promise<typeof mongoose> => {
        for (let attempt = 1; attempt <= DB_CONFIG.maxRetries; attempt++) {
            try {
                console.log(`🔄 Connection attempt ${attempt}/${DB_CONFIG.maxRetries}`);
                
                const conn = await mongoose.connect(DB_CONFIG.uri, {
                    ...DB_CONFIG.options,
                    dbName: DB_CONFIG.dbName,
                });

                isConnected = true;
                
                console.log(`✅ MongoDB connected successfully!`);
                
                return conn;

            } catch (error: any) {
                console.error(`❌ Connection failed (Attempt ${attempt}/${DB_CONFIG.maxRetries}):`, error.message);
                
                connectionPromise = null;

                if (attempt === DB_CONFIG.maxRetries) {
                    console.error("💥 Maximum connection retries reached. Application may not function properly.");
                    throw new Error(`Failed to connect to database after ${DB_CONFIG.maxRetries} attempts: ${error.message}`);
                }

                console.log(`⏳ Retrying in ${DB_CONFIG.retryDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, DB_CONFIG.retryDelay));
            }
        }
        
        throw new Error('Unexpected error in connection process');
    })();

    return connectionPromise;
}

mongoose.connection.on('connected', () => {
    console.log('🎉 Mongoose connected to MongoDB');
    isConnected = true;
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
    isConnected = false;
    connectionPromise = null;
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
    isConnected = false;
    connectionPromise = null;
});

process.on('SIGINT', async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        console.log('🛑 Closing MongoDB connection...');
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed.');
    }
    process.exit(0);
});

export function getConnectionStatus() {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    return {
        isConnected: mongoose.connection.readyState === 1,
        readyState: states[mongoose.connection.readyState] || 'unknown',
        dbName: mongoose.connection.db?.databaseName,
        host: mongoose.connection.host,
        models: Object.keys(mongoose.connection.models),
    };
}

export async function disconnectDB(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        isConnected = false;
        connectionPromise = null;
        console.log('🔌 Database disconnected');
    }
}