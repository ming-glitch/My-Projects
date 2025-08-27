export async function GET() {
    try {
        // Check environment variable
        const isAdmin = process.env.ADMIN_MODE === 'true';

        return Response.json({
            isAdmin,
            message: isAdmin ? 'Admin mode enabled' : 'Admin mode disabled',
            timestamp: new Date().toISOString()
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'CDN-Cache-Control': 'no-cache'
            }
        });

    } catch (error) {
        return Response.json({
            isAdmin: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}