import { TestBed } from '@angular/core/testing';

import { RowDataService } from './row-data.service';

describe('RowDataService', () => {
  let service: RowDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
