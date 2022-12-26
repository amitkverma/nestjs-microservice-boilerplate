export interface S3Config {
    BUCKET_S3: string;
    REGION: string,
    S3_ACCESS_ID: string,
    S3_SECRATE_KEY: string,
}

export interface AWSConfig {
    accessKeyId: string,
    secretAccessKey: string,
    region: string,
}

export interface S3Config {
  awsConfig: AWSConfig,
  bucket: string,
  basePath?: string,
  fileSize?: string,
}