'use client';
import React, { useEffect, useState } from 'react'

interface Folder {
    name: string
    id: string
}

const ListFolderDrive = () => {
    const [folders, setFolders] = useState<Folder[]>([])

    useEffect(() => {
        async function fetchFolders() {
            try {
                const response = await fetch('/api/listFolders')
                const data = await response.json()
                setFolders(data)
            } catch (error) {
                console.error('Error fetching folders:', error)
            }
        }

        fetchFolders()
    }, [])

    return (
        <div>
            {folders.map((folder) => (
                <div key={folder.id}>{folder.name}</div>
            ))}
        </div>
    )
}

export default ListFolderDrive
