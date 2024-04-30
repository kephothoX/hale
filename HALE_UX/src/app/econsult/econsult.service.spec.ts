import { TestBed } from '@angular/core/testing';

import { EconsultService } from './econsult.service';

describe('EconsultService', () => {
  let service: EconsultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EconsultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
