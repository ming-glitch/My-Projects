// components/DebugAdmin.js (temporary - remove after debugging)
'use client';
import { useEffect, useState } from 'react';

export default function DebugAdmin() {
    const [adminStatus, setAdminStatus] = useState('checking...');

    useEffect(() => {
        const check = async () => {
            try {
                const response = await fetch('/api/check-admin');
                const data = await response.json();
                setAdminStatus(`Admin: ${data.isAdmin} - ${data.message}`);
            } catch (error) {
                setAdminStatus(`Error: ${error.message}`);
            }
        };
        check();
    }, []);

    return (
        <div style={{position: 'fixed', bottom: 10, right: 10, background: 'white', padding: '10px', border: '1px solid black', zIndex: 1000}}>
            {adminStatus}
        </div>
    );
}