import { TestBed } from '@angular/core/testing';

import { UsersBackService } from './users-back.service';

describe('UsersBackService', () => {
  let service: UsersBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
