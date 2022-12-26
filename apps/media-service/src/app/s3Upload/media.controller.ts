import { Controller, Get, Post, Logger, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder } from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
@ApiTags('upload')
export class MediaController {

  private readonly logger = new Logger(MediaController.name);
  constructor(private readonly mediaService: MediaService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    try {
      this.logger.log(`file uploaded ${JSON.stringify(file)}`)
      const uploadedFile = await this.mediaService.uploadFile(file);
      return { ...uploadedFile, fileName: file.originalname, mimeType: file.mimetype }
    } catch (error) {
      this.logger.error(`unable to upload file ${error}`)
      return error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

}
