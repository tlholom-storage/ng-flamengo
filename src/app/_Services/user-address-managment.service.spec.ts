/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAddressManagmentService } from './user-address-managment.service';

describe('Service: UserAddressManagment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAddressManagmentService]
    });
  });

  it('should ...', inject([UserAddressManagmentService], (service: UserAddressManagmentService) => {
    expect(service).toBeTruthy();
  }));
});
