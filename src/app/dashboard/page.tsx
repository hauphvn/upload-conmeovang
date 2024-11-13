'use client';

import React from 'react';
import withAuth from "@/app/withAuth";
// Example of calling the API route from your frontend
const handleAuthCode = async (code:any) => {
    const response = await fetch('/api/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    });

    if (response.ok) {
        const tokens = await response.json();
        console.log('Access Token:', tokens.access_token);
    } else {
        console.error('Failed to get tokens');
    }
};

const DashboardPage =  () => {
    return (
        <div>
            upload
            <button onClick={handleAuthCode}>
                call code
            </button>
        </div>
    );
};

export default withAuth(DashboardPage);
