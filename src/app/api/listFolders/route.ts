import { google } from 'googleapis'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 })
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
        return NextResponse.json(folders || [])
    } catch (error) {
        console.error('Error listing folders:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
