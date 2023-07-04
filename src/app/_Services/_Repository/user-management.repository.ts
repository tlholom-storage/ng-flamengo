import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseObject } from 'src/app/_Interfaces/IResponseObject';
import { IUser } from 'src/app/_Interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementRepository {

  private usersEndpoint: string = environment.baseUrl + 'user'

  constructor(private httpClient: HttpClient) {}

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    return headers
  }

  public getUsers(): Observable<IUser[]> {
    return new Observable<IUser[]>((observer) => {
      this.httpClient
        .get<IResponseObject>(this.usersEndpoint, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject
            observer.next(returnedData.response.data as IUser[])
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(error)
          },
          complete: () => console.info('Get Completed.'),
        })
    })
  }

  public postUser(item: IUser): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post<IResponseObject>(this.usersEndpoint, item, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject
            let data = returnedData!.success
            observer.next(data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(error)
          },
          complete: () => console.info('Post Completed.'),
        })
    })
  }

  public deleteUser(id: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const endpoint = `${this.usersEndpoint}/${id}`
      this.httpClient
        .delete<IResponseObject>(endpoint, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject
            let data = returnedData!.success
            observer.next(data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(error)
          },
          complete: () => console.info('Post Completed.'),
        })
    })
  }

  public patchUser(id: string, updatedData: Partial<IUser>): Observable<boolean> {
    return new Observable<boolean>(observer =>{
      const endpoint = `${this.usersEndpoint}/${id}`
      this.httpClient
        .patch<IResponseObject>(endpoint, updatedData, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject
            let data = returnedData!.success
            observer.next(data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(error)
          },
          complete: () => console.info('Patch Completed.'),
        })
    })
  }

  public getUser(id: string): Observable<IUser> {
    return new Observable<IUser>(observer =>{
      const endpoint = `${this.usersEndpoint}/${id}`

      this.httpClient.get<IResponseObject>(endpoint, {
        headers: this.createHeaders(),
        observe: 'response'
      }).subscribe({ next:  (result)=>{
        let returnedData = result.body as IResponseObject
        let data = returnedData!.response!.data[0] as IUser
        observer.next(data)
        observer.complete()
      },
      error: (error) => {
        console.log(error)
        observer.error(error)
      },
      complete: () => console.info('Get Completed.'),
    })

  })
  }
}
