// test-connection.js
const { MongoClient } = require('mongodb');

// Replace with your NEW connection string
const uri = 'mongodb+srv://newusername:newpassword@cluster0.x7uqgch.mongodb.net/portfolio-projects';

async function testConnection() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('✅ Successfully connected to MongoDB!');

        const db = client.db('portfolio-projects');

        // Try to create a collection and insert a document
        const collection = db.collection('test');
        await collection.insertOne({
            test: 'connection',
            timestamp: new Date()
        });
        console.log('✅ Successfully wrote to database!');

        // Clean up
        await collection.deleteMany({ test: 'connection' });
        console.log('✅ Cleanup completed!');

        await client.close();
        console.log('✅ Connection closed. All tests passed!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testConnection();