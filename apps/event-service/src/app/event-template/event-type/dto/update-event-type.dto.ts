import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTypeDto } from './create-event-type.dto';

export class UpdateEventTypeDto extends PartialType(CreateEventTypeDto) {}
