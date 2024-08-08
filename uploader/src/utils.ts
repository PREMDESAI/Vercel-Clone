import fs from "fs"
import path from "path"

export function generateId(){
    let ans = ""
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i = 0; i < 10; i++){
        ans += chars[Math.floor(Math.random() * chars.length)]
    }
    return ans
}

export function getAllFiles (folderPath: string) {
    const files = fs.readdirSync(folderPath)
    const allFiles = files.map((file) => {
        const filePath = path.join(folderPath, file)
        return filePath
    })
    return allFiles
}