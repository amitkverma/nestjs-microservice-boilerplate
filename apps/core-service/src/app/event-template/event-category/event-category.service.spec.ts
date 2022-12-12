import { Test, TestingModule } from '@nestjs/testing';
import { EventCategoryService } from './event-category.service';

describe('EventCategoryService', () => {
  let service: EventCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCategoryService],
    }).compile();

    service = module.get<EventCategoryService>(EventCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
