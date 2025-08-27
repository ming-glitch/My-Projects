// app/add-card/page.js
import AddCard from '@/components/AddCard';
import { redirect } from 'next/navigation';

// This function will check admin status on the server
async function checkAdmin() {
    try {
        // For server-side, we can check the environment variable directly
        const isAdmin = process.env.ADMIN_MODE === 'true';

        console.log('Admin check - Server side:', isAdmin);
        return isAdmin;
    } catch (error) {
        console.error('Admin check error:', error);
        return false;
    }
}

export default async function AddCardPage() {
    const isAdmin = await checkAdmin();
    console.log('Is admin:', isAdmin);

    if (!isAdmin) {
        console.log('Not admin, redirecting to home');
        redirect('/');
    }

    return <AddCard />;
}