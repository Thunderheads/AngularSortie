import { TestBed } from '@angular/core/testing';

import { SortieGuard } from './sortie-guard.guard';

describe('SortieGuardGuard', () => {
  let guard: SortieGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SortieGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
