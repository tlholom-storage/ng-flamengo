import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuth } from 'src/app/_Interfaces/IAuth';
import { IResponseObject } from 'src/app/_Interfaces/IResponseObject';
import { IUser } from 'src/app/_Interfaces/IUser';
import { environment } from 'src/environments/environment';
import { BrowserStorageService } from '../browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthManagementRepository {
  private authEndpoint: string = environment.baseUrl + 'auth';

  get isLoggedIn(): boolean {
    const user = this.browserService.getLocal('user');
    return user !== null && user.idToken !== undefined ? true : false;
  }

  get authState(): IAuth | null {
    if (this.isLoggedIn) return this.browserService.getLocal('user') as IAuth;
    return null;
  }

  constructor(
    private httpClient: HttpClient,
    private browserService: BrowserStorageService
  ) {}

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    return headers;
  }

  public authLogin(user: {
    email: string;
    password: string;
  }): Observable<IAuth> {
    const authLoginEndpoint = `${this.authEndpoint}/login`;
    return new Observable<IAuth>((observer) => {
      this.httpClient
        .post<IResponseObject>(authLoginEndpoint, user, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            const authData = returnedData.response.data[0] as IAuth;
            this.browserService.setLocal('user', authData);
            observer.next(authData);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Login Completed.'),
        });
    });
  }

  public authRegister(user: {
    email: string;
    password: string;
  }): Observable<IAuth> {
    const authLoginEndpoint = `${this.authEndpoint}/register`;
    return new Observable<IAuth>((observer) => {
      this.httpClient
        .post<IResponseObject>(authLoginEndpoint, user, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            const authData = returnedData.response.data[0] as IAuth;
            this.browserService.setLocal('user', authData);
            observer.next(authData);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Register Completed.'),
        });
    });
  }

  public authRefreshToken(data: { refresh_token: string }): Observable<IAuth> {
    const authLoginEndpoint = `${this.authEndpoint}/refresh`;
    return new Observable<IAuth>((observer) => {
      this.httpClient
        .post<IResponseObject>(authLoginEndpoint, data, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            const authData = returnedData.response.data[0] as IAuth;
            this.browserService.setLocal('user', authData);
            observer.next(authData);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Refresh Token Completed.'),
        });
    });
  }

  public authUserDetails(): Observable<IUser> {
    if (this.authState) {
      const authLoginEndpoint = `${environment.baseUrl}user/lookup/${this.authState.localId}`;
      return new Observable<IUser>((observer) => {
        this.httpClient
          .get<IResponseObject>(authLoginEndpoint, {
            headers: this.createHeaders(),
            observe: 'response',
          })
          .subscribe({
            next: (result) => {
              const returnedData = result.body as IResponseObject;
              const authUser = returnedData.response.data[0] as IUser;
              observer.next(authUser);
              observer.complete();
            },
            error: (error) => {
              console.log(error);
              observer.error(error);
            },
            complete: () => console.info('Get User Details Completed.'),
          });
      });
    } else {
      return of({} as IUser);
    }
  }

  public SignOut(): void {
    localStorage.removeItem('user');
  }

  public authSendResetPasswordEmail(data: {
    email: string;
  }): Observable<boolean> {
    const authSendResetPasswordEmailEndpoint = `${this.authEndpoint}/reset-password/send-email`;
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post<IResponseObject>(authSendResetPasswordEmailEndpoint, data, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            observer.next(returnedData.success);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Send Reset Password Email Completed.'),
        });
    });
  }

  public authConfirmPasswordReset(data: {
    oobCode: string;
    newPassword: string;
  }) {
    const authConfirmPasswordResetEndpoint = `${this.authEndpoint}/reset-password/confirm-password`;
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post<IResponseObject>(authConfirmPasswordResetEndpoint, data, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            observer.next(returnedData.success);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Confirm Reset Password Completed.'),
        });
    });
  }

  public authVerifyPasswordResetCode(data: { oobCode: string }) {
    const authVerifyPasswordResetCodeEndpoint = `${this.authEndpoint}/reset-password/verify-code`;
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post<IResponseObject>(authVerifyPasswordResetCodeEndpoint, data, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            observer.next(returnedData.success);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Verify Reset Password Code Completed.'),
        });
    });
  }
}
