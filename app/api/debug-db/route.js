// app/api/debug-db/route.js
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();

        if (!db) {
            return Response.json({
                status: 'error',
                message: 'Database connection failed',
                env: process.env.MONGODB_URI ? 'MONGODB_URI is set' : 'MONGODB_URI is NOT set'
            }, { status: 500 });
        }

        // Test a simple query
        const collections = await db.listCollections().toArray();

        return Response.json({
            status: 'success',
            collections: collections.map(c => c.name),
            message: 'Database connection working'
        });

    } catch (error) {
        return Response.json({
            status: 'error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}