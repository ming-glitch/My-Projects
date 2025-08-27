import { MongoClient } from "mongodb";

// Please paste your ACTUAL connection string here (I'll show you how to format it)
const uri = 'mongodb+srv://portfolioadmin:admin123@cluster0.x7uqgch.mongodb.net/portfolio-projects?retryWrites=true&w=majority&appName=Cluster0';

console.log('Testing connection to:', uri.replace(/:[^:]*@/, ':****@'));

async function testConnection() {
    try {
        const client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000
        });

        await client.connect();
        console.log('✅ Connected to MongoDB server!');

        // List all databases to verify connection
        const adminDb = client.db('admin').admin();
        const databases = await adminDb.listDatabases();
        console.log('✅ Available databases:', databases.databases.map(db => db.name));

        // Test if our specific database exists
        const targetDb = client.db('portfolio-projects');
        const collections = await targetDb.listCollections().toArray();
        console.log('✅ Collections in portfolio-projects:', collections.map(c => c.name));

        await client.close();

    } catch (error) {
        console.error('❌ Detailed error:', error.message);

        if (error.message.includes('authentication failed')) {
            console.log('\n🔐 AUTHENTICATION ISSUE:');
            console.log('1. Please verify your username and password');
            console.log('2. Check if special characters need URL encoding');
            console.log('3. Confirm the user exists in MongoDB Atlas');
        }

        if (error.message.includes('querySrv')) {
            console.log('\n🌐 NETWORK ISSUE:');
            console.log('1. Check your internet connection');
            console.log('2. Verify your IP is whitelisted in MongoDB Atlas');
        }
    }
}

testConnection();