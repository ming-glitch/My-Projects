import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

// Helper function to handle database errors
function handleDatabaseError(error) {
    console.error('Database error:', error);

    if (error.message.includes('password')) {
        return {
            error: 'Authentication failed',
            message: 'Please check your MongoDB username and password'
        };
    } else if (error.message.includes('querySrv')) {
        return {
            error: 'Connection failed',
            message: 'Could not connect to MongoDB server. Check your connection string and network.'
        };
    } else {
        return {
            error: 'Database connection failed',
            message: error.message
        };
    }
}

export async function GET(request) {
    try {
        console.log('API: Fetching projects...');

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 100;

        try {
            const client = await clientPromise;
            const db = client.db('portfolio-projects');
            const collection = db.collection('projects');

            const total = await collection.countDocuments();
            const projects = await collection.find()
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .toArray();

            console.log(`API: Found ${projects.length} projects`);

            return Response.json({
                data: projects,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (dbError) {
            console.error('Database error in GET:', dbError);
            const errorResponse = handleDatabaseError(dbError);

            // Return empty data with error information
            return Response.json({
                data: [],
                pagination: {
                    page: 1,
                    limit: 100,
                    total: 0,
                    totalPages: 0
                },
                error: errorResponse
            });
        }
    } catch (error) {
        console.error('API Error:', error);
        return Response.json(
            {
                error: 'Failed to fetch projects',
                details: error.message,
                type: 'api_error'
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        try {
            const client = await clientPromise;
            const db = client.db('portfolio-projects');

            const result = await db.collection('projects').insertOne({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return Response.json(result, { status: 201 });
        } catch (dbError) {
            console.error('Database error in POST:', dbError);
            const errorResponse = handleDatabaseError(dbError);
            return Response.json(errorResponse, { status: 500 });
        }
    } catch (error) {
        console.error('Request processing error:', error);
        return Response.json(
            { error: 'Failed to create project', message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({ error: 'Project ID is required' }, { status: 400 });
        }

        try {
            const client = await clientPromise;
            const db = client.db('portfolio-projects');
            const result = await db.collection('projects')
                .deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return Response.json({ error: 'Project not found' }, { status: 404 });
            }

            return Response.json({ message: 'Project deleted successfully' });
        } catch (dbError) {
            console.error('Database error in DELETE:', dbError);
            const errorResponse = handleDatabaseError(dbError);
            return Response.json(errorResponse, { status: 500 });
        }
    } catch (error) {
        console.error('Request processing error:', error);
        return Response.json(
            { error: 'Failed to delete project', message: error.message },
            { status: 500 }
        );
    }
}