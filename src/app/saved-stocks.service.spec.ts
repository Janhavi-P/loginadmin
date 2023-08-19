import { TestBed } from '@angular/core/testing';

import { SavedStocksService } from './saved-stocks.service';

describe('SavedStocksService', () => {
  let service: SavedStocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedStocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
