import {google} from 'googleapis'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {getServerSession} from "next-auth"
import {NextResponse} from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'
import {authOptions} from "@/app/api/auth/[...nextauth]";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({error: 'No file provided'}, {status: 400})
        }

        // Save the file to a temporary location
        const tempFilePath = path.join(os.tmpdir(), file.name)
        const buffer = Buffer.from(await file.arrayBuffer())
        fs.writeFileSync(tempFilePath, buffer)
// Load service account credentials
        const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH
        const auth = new google.auth.GoogleAuth({
            keyFile,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        })
        // Initialize Google Drive API


        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        )

        oauth2Client.setCredentials({
            access_token: session.accessToken as string
        })

        // Initialize Google Drive API
        const drive = google.drive({ version: 'v3', auth })
        const fileStream = fs.createReadStream(tempFilePath);

        // Upload file to Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.type,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
            },
            media: {
                mimeType: file.type,
                body: fileStream,
            },
        })

        // Upload file to Google Drive
        // const response = await drive.files.create({
        //     requestBody: {
        //         name: file.name,
        //         mimeType: file.type,
        //         parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        //     },
        //     media: {
        //         mimeType: file.type,
        //         body: fileStream,
        //     },
        // })

        // Clean up the temporary file
        fs.unlinkSync(tempFilePath)

        return NextResponse.json({
            fileId: response.data.id,
            fileName: response.data.name
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({error: 'Upload failed'}, {status: 500})
    }
}
