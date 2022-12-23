import { PartialType } from '@nestjs/mapped-types';
import { CreateEventMediaDto } from './create-event-media.dto';

export class UpdateEventMediaDto extends PartialType(CreateEventMediaDto) {}
