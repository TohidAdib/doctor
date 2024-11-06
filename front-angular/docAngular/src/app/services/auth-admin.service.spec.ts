import { TestBed } from '@angular/core/testing';

import {AdminGuard} from './auth-admin.service'

describe('AuthAdminService', () => {
  let service: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
