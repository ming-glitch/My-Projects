import { MongoClient } from 'mongodb';

// Use your connection string directly for testing
const uri = 'mongodb+srv://portfolio-user:JnfQoQ4UCDTKYy@cluster0.x7uqgch.mongodb.net/portfolio-projects?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  console.log('Testing MongoDB connection...');

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');

    const db = client.db('portfolio-projects');
    console.log('✅ Accessed database: portfolio-projects');

    // Try to create a test collection
    const testCollection = db.collection('test_connection');
    await testCollection.insertOne({
      message: 'Connection test successful',
      timestamp: new Date()
    });
    console.log('✅ Successfully wrote to database!');

    // Clean up
    await testCollection.deleteMany({});
    console.log('✅ Cleanup completed!');

    await client.close();
    console.log('🎉 All tests passed! Your MongoDB connection is working!');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);

    if (error.message.includes('authentication failed')) {
      console.log('\n🔐 Authentication failed. Please check:');
      console.log('1. Is the username "portfolio-user" correct?');
      console.log('2. Is the password correct?');
      console.log('3. Does this user have read/write permissions?');
    } else if (error.message.includes('getaddrinfo')) {
      console.log('\n🌐 Network error. Please check your internet connection.');
    }
  }
}

testConnection();