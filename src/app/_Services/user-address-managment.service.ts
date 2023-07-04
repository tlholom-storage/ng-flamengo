import { Injectable } from '@angular/core';
import { IUserAddress } from '../_Interfaces/IUserAddress';
import { UserAddressManagementRepository } from './_Repository/user-address-management.repository';

@Injectable({
  providedIn: 'root',
})
export class UserAddressManagmentService {
  constructor(private userAddressRepo: UserAddressManagementRepository) {}

  public postUserAddress(item: IUserAddress) {
    return this.userAddressRepo.postAddress(item);
  }

  public getUserAddress() {
    return this.userAddressRepo.getUserAddresses();
  }
}
