// app/api/test-db/route.js
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();

        if (!db) {
            return Response.json({
                status: 'error',
                message: 'Failed to connect to database',
                error: process.env.MONGODB_URI ? 'Connection failed' : 'MONGODB_URI not set'
            });
        }

        // Try a simple operation
        const collections = await db.listCollections().toArray();

        return Response.json({
            status: 'success',
            collections: collections.map(c => c.name),
            message: 'Database connection successful'
        });

    } catch (error) {
        return Response.json({
            status: 'error',
            message: error.message
        });
    }
}