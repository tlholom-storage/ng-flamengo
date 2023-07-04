/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAddressManagementRepository } from './user-address-management.repository';

describe('Service: UserAddressManagementRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAddressManagementRepository],
    });
  });

  it('should ...', inject(
    [UserAddressManagementRepository],
    (service: UserAddressManagementRepository) => {
      expect(service).toBeTruthy();
    }
  ));
});
