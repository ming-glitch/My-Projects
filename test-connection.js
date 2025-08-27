// test-connection.js
import { MongoClient } from "mongodb";

async function testConnection() {
  const uri = 'mongodb+srv://portfolioadmin:admin123@cluster0.x7uqgch.mongodb.net/portfolio-projects?retryWrites=true&w=majority&appName=Cluster0';

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');

    const db = client.db('portfolio-projects');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    await client.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();