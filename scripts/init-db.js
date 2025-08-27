// scripts/init-db.js
import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://portfolioadmin:admin123@cluster0.x7uqgch.mongodb.net/portfolio-projects?retryWrites=true&w=majority&appName=Cluster0';

async function initDatabase() {
    try {
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db('portfolio-projects');

        // Create projects collection if it doesn't exist
        const collections = await db.listCollections().toArray();
        const projectsCollectionExists = collections.some(c => c.name === 'projects');

        if (!projectsCollectionExists) {
            await db.createCollection('projects');
            console.log('✅ Created projects collection');

            // Add sample data
            await db.collection('projects').insertMany([
                {
                    title: 'Weather App',
                    description: 'A responsive weather application that displays current weather and forecasts.',
                    liveUrl: 'https://weatherapp.example.com',
                    tags: ['React', 'API', 'CSS'],
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'E-commerce Site',
                    description: 'A fully functional e-commerce website with product filtering and cart functionality.',
                    liveUrl: 'https://ecommerce.example.com',
                    tags: ['Next.js', 'Node.js', 'MongoDB'],
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]);
            console.log('✅ Added sample projects');
        }

        await client.close();
        console.log('✅ Database initialization complete');
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
    }
}

initDatabase();