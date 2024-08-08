import express from "express"
import cors from "cors"
import simpleGit from "simple-git"
import { generateId, getAllFiles } from "./utils"
import path from "path"
import { uploadSingleFile } from "./s3"
import { createClient } from "redis"
const redisQueue = createClient()
redisQueue.connect()

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World!")
    console.log(path.join(__dirname, "../out"))
})

app.post("/upload", async (req,res) => {
    try{
        const url = req.body.url
        const id = generateId()
        await simpleGit().clone(url, path.join(__dirname, `../out/${id}`))
        const files = getAllFiles(path.join(__dirname, `../out/${id}`));
        files.forEach(async file => {
            console.log(file)
            await uploadSingleFile(file.slice(__dirname.length + 1), file);
        })
        redisQueue.lPush("file-queue", id)
        return res.json({
            msg: "Repo URL Recieved",
            url: url,
            id
        })
    } catch(err:any){
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
})


app.listen(3000, () => console.log("Server is running on port 3000"))