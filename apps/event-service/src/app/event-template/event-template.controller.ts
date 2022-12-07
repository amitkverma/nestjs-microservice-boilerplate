import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventTemplateService } from './event-template.service';
import { CreateEventTemplateDto } from './dto/create-event-template.dto';
import { UpdateEventTemplateDto } from './dto/update-event-template.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-template')
@Controller('event-template')
export class EventTemplateController {
  constructor(private readonly eventTemplateService: EventTemplateService) {}

  @Post()
  create(@Body() createEventTemplateDto: CreateEventTemplateDto) {
    return this.eventTemplateService.create(createEventTemplateDto);
  }

  @Get()
  findAll() {
    return this.eventTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTemplateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTemplateDto: UpdateEventTemplateDto) {
    return this.eventTemplateService.update(id, updateEventTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTemplateService.remove(id);
  }
}
