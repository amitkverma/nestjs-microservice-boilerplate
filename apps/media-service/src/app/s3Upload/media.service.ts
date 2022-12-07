import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { v4 as uuidId } from 'uuid';
import {readFileSync} from 'fs'

@Injectable()
export class MediaService {
  AWS_S3_BUCKET = process.env.BUCKET_S3;
  AWS_REGION = process.env.REGION
  s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_SECRATE_KEY,
  });


  findOne(id: string) {
    return `This action returns a #${id} media`;
  }

  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Body: readFileSync(file.path),
      Key: `${uuidId()}-${file.originalname}`,
      ACL: "public-read",
      ContentDisposition: "inline",
      CreateBucketConfiguration: {
        LocationConstraint: this.AWS_REGION
      },
    };
    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }

}
