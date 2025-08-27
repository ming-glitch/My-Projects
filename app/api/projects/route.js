// app/api/projects/route.js - Add default values
export async function POST(request) {
    try {
        const data = await request.json();

        // Set default values for missing fields
        const projectData = {
            title: data.title || '',
            liveUrl: data.liveUrl || '',
            description: data.description || '',
            tags: data.tags || [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const db = await getDatabase();
        if (!db) {
            return Response.json({ error: 'Database not available' }, { status: 500 });
        }

        const result = await db.collection('projects').insertOne(projectData);

        return Response.json({
            success: true,
            insertedId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}