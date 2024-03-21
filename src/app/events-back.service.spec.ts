import { TestBed } from '@angular/core/testing';

import { EventsBackService } from './events-back.service';

describe('EventsBackService', () => {
  let service: EventsBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
