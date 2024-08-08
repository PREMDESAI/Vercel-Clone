export interface S3Provider {
    region?: string
    credentials?: {
        accessKeyId: string
        secretAccessKey: string
    }
}