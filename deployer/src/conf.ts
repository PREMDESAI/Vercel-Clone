require('dotenv').config()

export const S3_SECRET = process.env.S3_ACCESS_SECRET
export const S3_KEY = process.env.S3_ACCESS_KEY
export const AWS_REGION = process.env.AWS_REGION