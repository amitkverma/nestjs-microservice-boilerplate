import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';

import { PaginationParams, SearchQueryParams } from '@spotlyt-backend/data/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('tenant/:tenantId')
  findAll(@Query() { take, skip }: PaginationParams,
    @Query() { query }: SearchQueryParams, @Param('tenantId') tenantId: string) {
    return this.eventService.findAll(tenantId, {
      skip: +skip, take: +take, where: {
        name: {
          contains: query ?? '',
          mode: 'insensitive'
        }
      }
    });
  }

  @Get('count/tenant/:tenantId')
  count(@Query() { query }: SearchQueryParams, @Param('tenantId') tenantId: string) {
    return this.eventService.count(tenantId, {
      name: {
        contains: query ?? '',
        mode: 'insensitive'
      }
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }


  @Patch('change-event-status')
  changeEventStatus(@Body() updateEventStatusDto: UpdateEventStatusDto) {
    return this.eventService.updateEventStatus(updateEventStatusDto);
  }

}
