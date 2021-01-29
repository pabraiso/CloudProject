import { TestBed } from '@angular/core/testing';

import { SignedGuard } from './signed.guard';

describe('SignedGuard', () => {
  let guard: SignedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
