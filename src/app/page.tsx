'use client'
import {useSession, signIn, signOut} from "next-auth/react"
import {useState} from "react"
import ListFolderDrive from "@/app/components/ListFolderDrive";

export default function Home() {
    const {data: session, status} = useSession()
    const [file, setFile] = useState<File | null>(null)
    const [uploadStatus, setUploadStatus] = useState<string>('')

    const handleUpload = async () => {
        if (!file || !session) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            setUploadStatus('Uploading...')
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json()
            setUploadStatus(`Upload successful! File ID: ${data.fileId}`)
        } catch (error) {
            setUploadStatus('Upload failed')
            console.error(error)
        }
    }

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (!session) {
        return (
            <div className="p-8">
                <button
                    onClick={() => signIn('google')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign in with Google
                </button>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    Signed in as {session.user?.email}
                </div>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign out
                </button>
                <ListFolderDrive/>
            </div>

            <div className="mt-8">
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100"
                    />
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Upload to Google Drive
                </button>

                {uploadStatus && (
                    <div className="mt-4 p-4 rounded bg-gray-100">
                        {uploadStatus}
                    </div>
                )}
            </div>
        </div>
    )
}
