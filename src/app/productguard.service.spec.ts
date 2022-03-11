import { TestBed } from '@angular/core/testing';

import { ProductguardService } from './productguard.service';

describe('ProductguardService', () => {
  let service: ProductguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
