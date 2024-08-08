import { S3 } from "aws-sdk"
import fs from "fs"
import { S3_KEY, S3_SECRET, AWS_REGION } from "./conf"

const s3 = new S3({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
    region: AWS_REGION  
})

export const uploadSingleFile = async (name: string, path: string) => {
    const content = await fs.promises.readFile(path)
    const res = await s3.upload({
        Body: content,
        Bucket: "vercel-aws-bucket",
        Key: name
    }).promise()
    console.log(res)
    return res
}