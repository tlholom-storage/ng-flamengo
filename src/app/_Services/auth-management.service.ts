import { Injectable } from '@angular/core';
import { AuthManagementRepository } from './_Repository/auth-management.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthManagementService {
  constructor(private authManagementRepo: AuthManagementRepository) {}

  public login(user: { email: string; password: string }) {
    return this.authManagementRepo.authLogin(user);
  }

  public register(user: { email: string; password: string }) {
    return this.authManagementRepo.authRegister(user);
  }

  public refreshToken(data: { refresh_token: string }) {
    return this.authManagementRepo.authRefreshToken(data);
  }

  get isLoggedIn() {
    return this.authManagementRepo.isLoggedIn;
  }

  get authState() {
    return this.authManagementRepo.authState;
  }

  public getUserDetails() {
    return this.authManagementRepo.authUserDetails();
  }

  public signOut() {
    return this.authManagementRepo.SignOut();
  }

  public sendPasswordResetEmail(data: { email: string }) {
    return this.authManagementRepo.authSendResetPasswordEmail(data);
  }

  public confirmPasswordReset(data: {oobCode:string,newPassword:string})
  {
    return this.authManagementRepo.authConfirmPasswordReset(data);
  }

  public verifyPasswordResetCode(data: {oobCode:string})
  {
    return this.authManagementRepo.authVerifyPasswordResetCode(data);
  }
}
