// app/api/projects/route.js
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();

        if (!db) {
            return Response.json({
                data: [],
                error: 'Database connection failed'
            });
        }

        const collection = db.collection('projects');
        const projects = await collection.find().sort({ createdAt: -1 }).toArray();

        return Response.json({ data: projects });

    } catch (error) {
        return Response.json({
            data: [],
            error: error.message
        });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const db = await getDatabase();

        if (!db) {
            return Response.json({ error: 'Database not available' }, { status: 500 });
        }

        const projectData = {
            title: data.title || '',
            liveUrl: data.liveUrl || '',
            description: data.description || '',
            tags: data.tags || [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('projects').insertOne(projectData);

        return Response.json({
            success: true,
            insertedId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}