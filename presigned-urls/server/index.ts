import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";

const ACCESS_KEY = process.env.ACCESS_KEY as string;
const SECRET_KEY = process.env.SECRET_KEY as string;

const BUCKET_PUBLIC_URL = process.env.BUCKET_PUBLIC_URL as string;

const BUCKET_ENDPOINT = process.env.BUCKET_ENDPOINT as string;
const BUCKET_NAME = process.env.BUCKET_NAME as string;

const PORT = 3000;

const s3Client = new S3Client({
  region: "auto",
  endpoint: BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

const app = express();
app.use(cors());

app.post("/signed-urls", async (req, res) => {
  const bucketKey = randomBytes(16).toString("hex");
  const signedUrl = await getSignedUrl(s3Client, new PutObjectCommand({ Bucket: BUCKET_NAME, Key: bucketKey }), {
    expiresIn: 30,
  });
  const publicUrl = `${BUCKET_PUBLIC_URL}/${bucketKey}`;

  res.json({ signedUrl, publicUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
