import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from '@spotlyt-backend/database';


@Module({
  imports: [PrismaModule],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
