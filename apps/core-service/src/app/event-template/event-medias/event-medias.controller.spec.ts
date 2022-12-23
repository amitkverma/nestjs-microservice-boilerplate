import { Test, TestingModule } from '@nestjs/testing';
import { EventMediasController } from './event-medias.controller';
import { EventMediasService } from './event-medias.service';

describe('EventMediasController', () => {
  let controller: EventMediasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventMediasController],
      providers: [EventMediasService],
    }).compile();

    controller = module.get<EventMediasController>(EventMediasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
