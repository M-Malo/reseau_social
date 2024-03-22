import { TestBed } from '@angular/core/testing';

import { FavorisBackService } from './favoris-back.service';

describe('FavorisBackService', () => {
  let service: FavorisBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorisBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
