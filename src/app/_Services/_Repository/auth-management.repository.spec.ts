/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthManagementRepository } from './auth-management.repository';

describe('Service: AuthManagement.repository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthManagementRepository]
    });
  });

  it('should ...', inject([AuthManagementRepository], (service: AuthManagementRepository) => {
    expect(service).toBeTruthy();
  }));
});
