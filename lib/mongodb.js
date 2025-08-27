// lib/mongodb.js - improved version
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    // Don't throw error to allow fallback to sample data
}

const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    retryWrites: true,
    w: 'majority'
};

let client;
let clientPromise;

if (!uri) {
    clientPromise = Promise.reject(new Error('MongoDB URI not configured'));
} else if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch(err => {
            console.error('Failed to connect to MongoDB:', err);
            return null; // Return null instead of throwing
        });
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        return null;
    });
}

// Helper function to get database connection
export async function getDatabase() {
    try {
        const client = await clientPromise;
        if (!client) {
            throw new Error('MongoDB client not available');
        }
        return client.db('portfolio-projects');
    } catch (error) {
        console.error('Database connection error:', error);
        return null;
    }
}

export default clientPromise;