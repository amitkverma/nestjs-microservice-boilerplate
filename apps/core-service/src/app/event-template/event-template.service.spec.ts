import { Test, TestingModule } from '@nestjs/testing';
import { EventTemplateService } from './event-template.service';

describe('EventTemplateService', () => {
  let service: EventTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTemplateService],
    }).compile();

    service = module.get<EventTemplateService>(EventTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
