// lib/mongodb.js - ENHANCED VERSION
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

console.log('MongoDB URI available:', !!uri);
if (uri) {
    console.log('MongoDB URI starts with:', uri.substring(0, 20) + '...');
}

const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 15000,
    retryWrites: true,
    w: 'majority'
};

let client;
let clientPromise;

if (!uri) {
    console.error('MONGODB_URI is not defined');
    clientPromise = Promise.reject(new Error('MongoDB URI not configured'));
} else {
    try {
        client = new MongoClient(uri, options);
        clientPromise = client.connect().then(connectedClient => {
            console.log('✅ Successfully connected to MongoDB');
            return connectedClient;
        }).catch(error => {
            console.error('❌ MongoDB connection failed:', error.message);
            throw error;
        });
    } catch (error) {
        console.error('❌ MongoDB client creation failed:', error.message);
        clientPromise = Promise.reject(error);
    }
}

export async function getDatabase() {
    try {
        const client = await clientPromise;
        return client.db('portfolio-projects');
    } catch (error) {
        console.error('getDatabase error:', error.message);
        return null;
    }
}

export default clientPromise;