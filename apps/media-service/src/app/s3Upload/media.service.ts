import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { v4 as uuidId } from 'uuid';
import {readFileSync} from 'fs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MediaService {
  AWS_S3_BUCKET: string;
  AWS_REGION: string;
  s3: AWS.S3;

  constructor(private readonly configService: ConfigService){
    this.AWS_REGION = this.configService.get<string>("REGION");
    this.AWS_S3_BUCKET = this.configService.get<string>("BUCKET_S3");
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>("S3_ACCESS_ID"),
      secretAccessKey: this.configService.get<string>("S3_SECRATE_KEY"),
    });
  }


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
