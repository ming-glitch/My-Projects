// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.warn('MONGODB_URI is not defined in environment variables');
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
} else {
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect().catch(err => {
                console.error('Failed to connect to MongoDB:', err);
                return null;
            });
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // Production: always create new connection
        client = new MongoClient(uri, options);
        clientPromise = client.connect().catch(err => {
            console.error('Failed to connect to MongoDB:', err);
            return null;
        });
    }
}

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