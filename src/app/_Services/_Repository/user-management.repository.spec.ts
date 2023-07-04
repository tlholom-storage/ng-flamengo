/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserManagementRepository } from './user-management.repository';

describe('Service: UserManagement.repository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementRepository]
    });
  });

  it('should ...', inject([UserManagementRepository], (service: UserManagementRepository) => {
    expect(service).toBeTruthy();
  }));
});
