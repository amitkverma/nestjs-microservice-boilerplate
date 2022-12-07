import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { CreateEventNoteDto, UpdateEventNoteDto } from './dto/create-note.dto';
import { CreateEventAttachmentDto } from './dto/create-attachment.dto';
import { CreateEventAudianceDto } from './dto/create-audiance.dto';
import { CreateEventParticipantDto } from './dto/create-event-participant.dto';
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
  
  @Get('event-status')
  getEventStatus(){
    return this.eventService.getAllEventStatus();
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


  @Patch('event-status/:id')
  changeEventStatus(@Body() updateEventStatusDto: UpdateEventStatusDto, @Param('id') id: string) {
    return this.eventService.updateEventStatus(id, updateEventStatusDto);
  }

  

  @Put('event-note')
  addEventNote(@Body() eventNoteDto: CreateEventNoteDto) {
    return this.eventService.addEventNote(eventNoteDto)
  }

  @Put('event-note/:id')
  editEventNote(@Body() eventNoteDto: UpdateEventNoteDto, @Param('id') id: string) {
    return this.eventService.editEventNote(id, eventNoteDto);
  }

  @Delete('event-note/:id')
  removeEventNote(@Param('id') id: string) {
    return this.eventService.removeEventNote(id);
  }

  @Put('attach-event-document')
  attachEventDocument(@Body() attachDocumentDto: CreateEventAttachmentDto) {
    return this.eventService.attachEventDocument(attachDocumentDto);
  }

  @Delete('attach-event-document/:id')
  removeAttachedEventDocument(@Param('id') id: string) {
    return this.eventService.removeAttachedEventDocument(id);
  }


  @Put('event-audiance')
  addEventAudience(@Body() createEventAudianceDto: CreateEventAudianceDto) {
    return this.eventService.addEventAudience(createEventAudianceDto);
  }

  @Delete('event-audiance/:id')
  removeEventAudience(@Param('id') id: string) {
    return this.eventService.removeEventAudience(id);
  }

  @Put('event-participant')
  addEventParticipant(@Body() createEventParticipantDto: CreateEventParticipantDto) {
    return this.eventService.addEventParticipant(createEventParticipantDto);
  }

  @Delete('event-participant/:id')
  removeEventParticipant(@Param('id') id: string) {
    return this.eventService.removeEventParticipant(id);
  }


}
