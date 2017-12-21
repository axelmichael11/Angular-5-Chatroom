import { TestBed, inject } from '@angular/core/testing';

import { CurrentusersService } from './currentusers.service';

describe('CurrentusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentusersService]
    });
  });

  it('should be created', inject([CurrentusersService], (service: CurrentusersService) => {
    expect(service).toBeTruthy();
  }));
});
