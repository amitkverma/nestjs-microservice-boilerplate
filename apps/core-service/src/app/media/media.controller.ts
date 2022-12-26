import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from '@spotlyt-backend/data/dtos';
import { EventMediaStatus } from '@prisma/client';
import { Authenticate } from '@spotlyt-backend/common';
import { jwtUser } from '@spotlyt-backend/data/interfaces';
import { EmployeeEventTypes } from './enums/enums';
const baseURL = 'employee-media';

@ApiTags('employee-medias')
@Controller(baseURL)
export class MediaController {
  private readonly logger = new Logger(MediaController.name);

  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    this.logger.log(`POST ${baseURL} - Create`);
    return this.mediaService.create(createMediaDto);
  }

  @ApiQuery({
    name: "status",
    enum: EventMediaStatus,
    enumName: 'status',
    description: "Status",
    required: false
  })
  @Get('event/:eventId')
  findAllMediasOfAEventBasedOnStatus(
    @Param('eventId') eventId: string,
    @Query() { take, skip }: PaginationParams,
    @Query('status') status?: string
  ) {
    this.logger.log(`POST ${baseURL}/event/${eventId} - findAllMediasOfAEventBasedOnStatus`);
    return this.mediaService.findAllMediasOfAEventBasedOnStatus(eventId, (status as EventMediaStatus ?? "Review"), {take, skip});
  }

  @ApiQuery({
    name: "status",
    enum: EventMediaStatus,
    enumName: 'status',
    description: "Status",
    required: false
  })
  @Get('event/:eventId/count')
  findAllMediasOfAEventBasedOnStatusCount(
    @Param('eventId') eventId: string,
    @Query('status') status?: string
  ){
    return this.mediaService.findAllMediasOfAEventBasedOnStatusCount(eventId, (status as EventMediaStatus ?? "Review"))
  }




  @ApiQuery({
    name: "status",
    enum: EventMediaStatus,
    enumName: 'status',
    description: "Status",
    required: true
  })
  @Patch('status/:id')
  updateEmployeeMediaStatus(
    @Param('id') id: string,
    @Query('status') status: EventMediaStatus
  ) {
    return this.mediaService.updateEmployeeMediaStatus(id, status);
  }



  @ApiQuery({
    name: "status",
    enum: EmployeeEventTypes,
    enumName: 'EmployeeEventTypes',
    description: "EmployeeEventTypes",
    required: false
  })
  @Get('tenant')
  @ApiBearerAuth('jwt')
  findAll(
    @Authenticate() currentUser: jwtUser,
    @Query('status') status: EmployeeEventTypes
  ) {
    this.logger.log(`Endpoint tenant/${currentUser.tenantId}`)
    console.log(`status: ${status}`);
    if(status === EmployeeEventTypes.Unpublished) return this.mediaService.eventCategoryInfoMedias(currentUser.tenantId);
    return {events: []}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
