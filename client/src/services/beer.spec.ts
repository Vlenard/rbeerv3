import { TestBed } from '@angular/core/testing';

import { Beer } from './beer';

describe('Beer', () => {
  let service: Beer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Beer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
