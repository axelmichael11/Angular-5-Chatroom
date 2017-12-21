import { TestBed, inject } from '@angular/core/testing';

import { MessagingHistoryService } from './messaginghistory.service';

describe('MessagingHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagingHistoryService]
    });
  });

  it('should be created', inject([MessagingHistoryService], (service: MessagingHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
