import { Test, TestingModule } from '@nestjs/testing';
import { FilterWordsController } from './filterwords.controller';

describe('FilterwordsController', () => {
  let controller: FilterWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilterWordsController],
    }).compile();

    controller = module.get<FilterWordsController>(FilterWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
