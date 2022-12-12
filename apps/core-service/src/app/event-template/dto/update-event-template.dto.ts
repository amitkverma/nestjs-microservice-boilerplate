import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTemplateDto } from './create-event-template.dto';

export class UpdateEventTemplateDto extends PartialType(CreateEventTemplateDto) {}
