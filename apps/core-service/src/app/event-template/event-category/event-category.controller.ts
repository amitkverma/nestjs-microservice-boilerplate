import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('event-category')
@Controller('event-category')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @Post()
  create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategoryService.create(createEventCategoryDto);
  }

  @Get()
  findAll() {
    return this.eventCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventCategoryDto: UpdateEventCategoryDto) {
    return this.eventCategoryService.update(id, updateEventCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventCategoryService.remove(id);
  }
}
