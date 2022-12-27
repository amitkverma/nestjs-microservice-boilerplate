import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { v4 as uuidId } from 'uuid';
import {readFileSync} from 'fs';
import { ConfigService } from '@nestjs/config';

import {promisify} from 'util';
import * as fs from 'fs';

const unlinkAsync = promisify(fs.unlink)


@Injectable()
export class MediaService {
  AWS_S3_BUCKET: string;
  AWS_REGION: string;
  s3: AWS.S3;
  private readonly logger = new Logger(MediaService.name);

  constructor(private readonly configService: ConfigService){
    this.logger.log(
      `Initialization Aws Bucket: ID: ${this.configService.get<string>("S3_ACCESS_ID")} 
      \n Sec: ${this.configService.get<string>("S3_SECRATE_KEY")}`);

    this.AWS_REGION = this.configService.get<string>("REGION");
    this.AWS_S3_BUCKET = this.configService.get<string>("BUCKET_S3");
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>("S3_ACCESS_ID"),
      secretAccessKey: this.configService.get<string>("S3_SECRATE_KEY"),
    });
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
      await unlinkAsync(file.path);
      return s3Response;
    }
    catch (error: unknown) {
      this.logger.error(`Upload Failed: ${(error as Error).message}`);
      this.logger.log(`Upload Failed: ${(error as Error).message}`);
      console.log(error);
      await unlinkAsync(file.path);
      throw new HttpException(`Failed To Upload`, HttpStatus.BAD_REQUEST);
    }
  }

}
