import { Injectable } from '@angular/core';
import { IUser } from '../_Interfaces/IUser';
import { UserManagementRepository } from './_Repository/user-management.repository';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {

  constructor(private userRepository: UserManagementRepository) {}

  public fetchUsers() {
    return this.userRepository.getUsers()
  }

  public postUser(item: IUser) {
    return this.userRepository.postUser(item)
  }

  public fetchUser(id: string) {
    return this.userRepository.getUser(id)
  }

  public updateUser(id: string, updatedData: Partial<IUser>) {
    return this.userRepository.patchUser(id, updatedData)
  }

  public deleteUser(id: string) {
    return this.userRepository.deleteUser(id)
  }
}
