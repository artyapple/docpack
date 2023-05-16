import { TestBed } from '@angular/core/testing';

import { DocPackServiceService } from './doc-pack-service.service';

describe('DocPackServiceService', () => {
  let service: DocPackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocPackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
