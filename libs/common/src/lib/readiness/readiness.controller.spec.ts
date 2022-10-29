import { Test, TestingModule } from '@nestjs/testing';
import { ReadinessController } from './readiness.controller';

describe('ReadinessController', () => {
  let controller: ReadinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadinessController],
    }).compile();

    controller = module.get<ReadinessController>(ReadinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
