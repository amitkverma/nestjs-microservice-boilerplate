import { registerAs } from '@nestjs/config';

export default registerAs('s3Config', () => ({
  awsConfig: {
    accessKeyId: process.env.S3_SECRATE_KEY || '',
    secretAccessKey: process.env.S3_ACCESS_ID || '',
    region: process.env.REGION || 'ap-south-1',
  },
  bucket: process.env.BUCKET_S3 || 'souravmediasdemo',
  basePath: 'souravmediasdemo',
  fileSize: 1 * 1024 * 1024,
}));