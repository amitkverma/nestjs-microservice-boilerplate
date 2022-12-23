import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventMediasService } from './event-medias.service';
import { CreateEventMediaDto } from './dto/create-event-media.dto';
import { UpdateEventMediaDto } from './dto/update-event-media.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-teamplate-medias')
@Controller('event-medias')
export class EventMediasController {
  constructor(private readonly eventMediasService: EventMediasService) {}

  @Post()
  create(@Body() createEventMediaDto: CreateEventMediaDto) {
    return this.eventMediasService.create(createEventMediaDto);
  }

  @Get()
  findAll() {
    return this.eventMediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventMediasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventMediaDto: UpdateEventMediaDto) {
    return this.eventMediasService.update(id, updateEventMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventMediasService.remove(id);
  }
}
