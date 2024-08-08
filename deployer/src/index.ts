import express from "express"
import cors from "cors"
import { createClient, commandOptions } from "redis"
const redisQueue = createClient()
import { pullS3Files } from "./src"
redisQueue.connect()

const app = express()
app.use(express.json())
app.use(cors())

async function main() {
    while(true) {
        const res: any =  await redisQueue.rPop(
            commandOptions({
                isolated: true
            }),
            "redisQueue"
        )
        console.log(res)
        const fileId = res?.element
        await pullS3Files(`/out/${fileId}`)
    }
}

app.listen(3001, () => {
    console.log("Listening on port 3001"),
    main()
})