// pages/api/google.js
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.AUTH_GOOGLE_CALLBACK
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code } = req.body;

        try {
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);
            res.status(200).json(tokens); // Return tokens to the client
        } catch (error) {
            console.error('Error retrieving access token', error);
            res.status(500).json({ error: 'Failed to retrieve access token' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
