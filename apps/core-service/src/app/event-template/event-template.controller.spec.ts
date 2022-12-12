import { Test, TestingModule } from '@nestjs/testing';
import { EventTemplateController } from './event-template.controller';
import { EventTemplateService } from './event-template.service';

describe('EventTemplateController', () => {
  let controller: EventTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTemplateController],
      providers: [EventTemplateService],
    }).compile();

    controller = module.get<EventTemplateController>(EventTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
