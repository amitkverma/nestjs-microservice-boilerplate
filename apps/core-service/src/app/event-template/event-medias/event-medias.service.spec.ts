import { Test, TestingModule } from '@nestjs/testing';
import { EventMediasService } from './event-medias.service';

describe('EventMediasService', () => {
  let service: EventMediasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventMediasService],
    }).compile();

    service = module.get<EventMediasService>(EventMediasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
