import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { CreateEventNoteDto, UpdateEventNoteDto } from './dto/create-note.dto';
import { CreateEventAttachmentDto } from './dto/create-attachment.dto';
import { CreateEventAudianceDto } from './dto/create-audiance.dto';
import { CreateEventParticipantDto } from './dto/create-event-participant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
  
  @Get('kanban/:tenantId')
  getKanban(@Param('tenantId') tenantId: string){
    return this.eventService.getKanban(tenantId)
  }

  @Get('event-status')
  getEventStatus(){
    return this.eventService.getAllEventStatus();
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


  @Put('event-audience')
  addEventAudience(@Body() createEventAudianceDto: CreateEventAudianceDto) {
    return this.eventService.addEventAudience(createEventAudianceDto);
  }

  @Delete('event-audiance/:eventId/team-name/:teamName')
  removeEventAudience(@Param('eventId') eventId: string, @Param('teamName') teamName: string) {
    return this.eventService.removeEventAudience(eventId, teamName);
  }

  @Put('event-participant')
  addEventParticipant(@Body() createEventParticipantDto: CreateEventParticipantDto) {
    return this.eventService.addEventParticipant(createEventParticipantDto);
  }

  @Delete('event-participant/:eventId/user/:userId')
  removeEventParticipant(@Param('eventId') eventId: string, @Param('userId') userId: string) {
    return this.eventService.removeEventParticipant(eventId, userId);
  }


}
