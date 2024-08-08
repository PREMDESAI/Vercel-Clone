import { S3 } from "aws-sdk"
import fs from "fs"
import path from "path"
import { S3_KEY, S3_SECRET, AWS_REGION } from "./conf"
import { S3Provider } from "./interface"

const s3 = new S3({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
    region: AWS_REGION
})    

export async function pullS3Files(folderPath: string) {
   
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel-aws-bucket",
        Prefix: folderPath
    }).promise()

    const files = allFiles.Contents?.map(async({ Key }) => {
        return new Promise(async (resolve) => {
            if(!Key){
                resolve("")
                return;
            } else {
                const outputPath = path.join(__dirname, Key);
                const outputFile = fs.createWriteStream(outputPath);
                const directory = path.dirname(outputPath);
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }
                s3.getObject({
                    Bucket: "vercel-aws-bucket",
                    Key: Key
                }).createReadStream().pipe(outputFile).on("finish", () => {
                    resolve("")
                })
            }
        })
    }) || []
    console.log(files)
    await Promise.all(files?.filter(x => x !== undefined))
}