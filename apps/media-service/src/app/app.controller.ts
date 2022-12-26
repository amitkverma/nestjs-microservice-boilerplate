import { Controller, Get, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AmazonS3FileInterceptor } from '@spotlyt-backend/multer-extended';

import { AppService } from './app.service';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(AmazonS3FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    this.logger.log(`file is uploaded ${JSON.stringify(file)}`)
    return file;
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
