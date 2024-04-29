import { Test, TestingModule } from '@nestjs/testing';
import { FilterWordsService } from './filterwords.service';

describe('FilterwordsService', () => {
  let service: FilterWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterWordsService],
    }).compile();

    service = module.get<FilterWordsService>(FilterWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
