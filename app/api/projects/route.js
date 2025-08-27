import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        console.log('API: Fetching projects...');

        const db = await getDatabase();

        if (!db) {
            console.log('API: Database not available, returning empty data');
            return Response.json({
                data: [],
                error: 'Database not available'
            });
        }

        const collection = db.collection('projects');
        const projects = await collection.find().sort({ createdAt: -1 }).toArray();

        console.log(`API: Found ${projects.length} projects`);

        return Response.json({
            data: projects
        });

    } catch (error) {
        console.error('API Error:', error);
        return Response.json({
            data: [],
            error: error.message
        });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        console.log('API: Received project data:', data);

        const db = await getDatabase();

        if (!db) {
            console.error('API: Database not available');
            return Response.json({
                error: 'Database not available',
                message: 'Please check your MongoDB connection'
            }, { status: 500 });
        }

        const projectData = {
            title: data.title || 'Untitled Project',
            liveUrl: data.liveUrl || '',
            description: data.description || '',
            tags: data.tags || [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const collection = db.collection('projects');
        const result = await collection.insertOne(projectData);

        return Response.json({
            success: true,
            insertedId: result.insertedId,
            message: 'Project added successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('API Error:', error);
        return Response.json({
            error: 'Failed to create project',
            message: error.message
        }, { status: 500 });
    }
}