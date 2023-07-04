/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthManagementService } from './auth-management.service';

describe('Service: AuthManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthManagementService]
    });
  });

  it('should ...', inject([AuthManagementService], (service: AuthManagementService) => {
    expect(service).toBeTruthy();
  }));
});
