// app/api/projects/route.js - improved
import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
    try {
        console.log('API: Attempting to fetch projects...');

        const db = await getDatabase();

        if (!db) {
            console.log('API: Using fallback data due to database connection issues');
            return Response.json({
                data: [],
                error: {
                    message: 'Database not available, using fallback data',
                    type: 'database_connection_error'
                }
            });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 100;

        const collection = db.collection('projects');
        const total = await collection.countDocuments();
        const projects = await collection.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        console.log(`API: Successfully fetched ${projects.length} projects`);

        return Response.json({
            data: projects,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return Response.json({
            data: [],
            error: {
                message: 'Failed to fetch projects',
                details: error.message,
                type: 'api_error'
            }
        }, { status: 200 }); // Still return 200 but with error info
    }
}