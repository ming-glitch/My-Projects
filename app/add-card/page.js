import AddCard from '@/components/AddCard';

async function checkAdmin() {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/check-admin?t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.isAdmin;
    } catch (error) {
        console.error('Admin check error:', error);
        return false;
    }
}

export default async function AddCardPage() {
    const isAdmin = await checkAdmin();

    return <AddCard />;
}