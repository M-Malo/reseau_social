import { TestBed } from '@angular/core/testing';

import { MessagesBackService } from './messages-back.service';

describe('MessagesBackService', () => {
  let service: MessagesBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
