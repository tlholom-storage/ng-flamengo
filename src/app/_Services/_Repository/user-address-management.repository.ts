import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseObject } from 'src/app/_Interfaces/IResponseObject';
import { IUserAddress } from 'src/app/_Interfaces/IUserAddress';
import { environment } from 'src/environments/environment';
import { AuthManagementService } from '../auth-management.service';

@Injectable({
  providedIn: 'root',
})
export class UserAddressManagementRepository {
  private userAddressEndpoint: string = environment.baseUrl + 'user';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthManagementService
  ) {
    this.userAddressEndpoint += `/${authService.authState?.localId}/address`;
  }

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    return headers;
  }

  public postAddress(item: IUserAddress): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post<IResponseObject>(this.userAddressEndpoint, item, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject;
            let data = returnedData!.success;
            observer.next(data);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Post Completed.'),
        });
    });
  }

  public getUserAddresses(): Observable<IUserAddress[]> {
    return new Observable<IUserAddress[]>((observer) => {
      this.httpClient
        .get<IResponseObject>(this.userAddressEndpoint, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject;
            observer.next(returnedData.response.data as IUserAddress[]);
            observer.complete();
          },
          error: (error) => {
            console.log(error);
            observer.error(error);
          },
          complete: () => console.info('Get Completed.'),
        });
    });
  }
}
