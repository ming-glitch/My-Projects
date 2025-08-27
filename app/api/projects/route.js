// app/api/projects/route.js - ENHANCED ERROR HANDLING
import { getDatabase } from '@/lib/mongodb';

export async function POST(request) {
    try {
        const data = await request.json();
        console.log('API: Received data:', data);

        const db = await getDatabase();

        if (!db) {
            console.error('API: Database not available');
            return Response.json(
                { error: 'Database not available', message: 'Please check your MongoDB connection' },
                { status: 500 }
            );
        }

        const result = await db.collection('projects').insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('API: Insert result:', result);

        return Response.json({
            success: true,
            insertedId: result.insertedId,
            message: 'Project added successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('API Error:', error);
        return Response.json(
            {
                error: 'Failed to create project',
                message: error.message,
                type: 'database_error'
            },
            { status: 500 }
        );
    }
}