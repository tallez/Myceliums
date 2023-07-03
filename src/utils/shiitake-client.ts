import { projectUpdateActions } from "@interface/global"

export async function createProject(id: string, title: string, description: string, author: string, authorId: string) {
    try {
        // Create Project in file system
        await fetch(`${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/project/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title, description, author, authorId
            }),
        }
        )
        return id

    } catch (e) {
        throw new Error(e)
    }
}

export async function updateProject(id: string, action: projectUpdateActions, fileName?: string, folderName?: string, content?: object[]) {
    try {
        await fetch(`${process.env.FILEMANAGER_PUBLIC_EXTERNAL || "http://localhost"}:${process.env.FILEMANAGER_PORT || "3100"}/project/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                action: action,
                folderName: folderName,
                fileName: fileName,
                content: content
            }),
        }
        )
    } catch (e) {
        throw new Error(e)
    }
}

export async function deleteProject(id: string) {
    try {
        await fetch(`${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/project/${id}`, {
            method: "DELETE"
        }
        )
    } catch (e) {
        throw new Error(e)
    }
}

export async function getProject(id: string) {
    try {
        const project = await fetch(`${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/project/${id}`
        ).then((res) => res.json())
        return (project)
    } catch (e) {
        throw new Error(e)
    }
}