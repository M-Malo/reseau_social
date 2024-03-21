import { TestBed } from '@angular/core/testing';

import { ConversationsBackService } from './conversations-back.service';

describe('ConversationsBackService', () => {
  let service: ConversationsBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationsBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
