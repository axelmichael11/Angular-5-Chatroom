import { TestBed, inject } from '@angular/core/testing';

import { EnterchatroomService } from './enterchatroom.service';

describe('EnterchatroomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterchatroomService]
    });
  });

  it('should be created', inject([EnterchatroomService], (service: EnterchatroomService) => {
    expect(service).toBeTruthy();
  }));
});
