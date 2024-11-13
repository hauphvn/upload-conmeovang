import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        return
    }

    // Load service account credentials
    const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    })

    // Initialize Google Drive API
    const drive = google.drive({ version: 'v3', auth })

    try {
        // List folders
        const response = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.folder'",
            fields: 'files(id, name)',
        })

        const folders = response.data.files
        if (folders?.length) {
            res.status(200).json(folders)
        } else {
            res.status(200).json([])
        }
    } catch (error) {
        console.error('Error listing folders:', error)
        res.status(500).json({ error: 'Error listing folders' })
    }
}
