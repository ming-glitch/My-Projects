import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('portfolio-projects'); // Specify your database name

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

// GET with Pagination
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 6;

        const { db } = await connectToDatabase();
        const collection = db.collection('projects');

        const total = await collection.countDocuments();
        const totalPages = Math.ceil(total / limit);

        const projects = await collection.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        return Response.json({
            data: projects,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        return Response.json({
            error: 'Failed to fetch projects',
            message: error.message
        }, { status: 500 });
    }
}

// POST (Create)
export async function POST(request) {
    try {
        const data = await request.json();
        const { db } = await connectToDatabase();

        const result = await db.collection('projects').insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return Response.json(result, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return Response.json({
            error: 'Failed to create project',
            message: error.message
        }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const result = await db.collection('projects')
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return Response.json({ error: 'Project not found' }, { status: 404 });
        }

        return Response.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return Response.json({
            error: 'Failed to delete project',
            message: error.message
        }, { status: 500 });
    }
}