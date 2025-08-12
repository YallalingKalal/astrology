import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AbhishekService {
  private BASE_URL = 'https://abhishekregister.astromonk.co.in/userregistration/user-registration';

  constructor(private http: HttpClient) {}

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/create_user/`, data)
      .pipe(
        catchError((error) => {
          console.error('Add user failed:', error);
          return throwError(() => error);
        })
      );
  }

  getAllData(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/list_users/`)
      .pipe(
        catchError((error) => {
          console.error('Get all data failed:', error);
          return throwError(() => error);
        })
      );
  }

  getDataById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/retrieve_user/${id}/`)
      .pipe(
        catchError((error) => {
          console.error('Get data by ID failed:', error);
          return throwError(() => error);
        })
      );
  }

  updateData(id: string, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/update_user/${id}/`, data)
      .pipe(
        catchError((error) => {
          console.error('Update data failed:', error);
          return throwError(() => error);
        })
      );
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete_user/${id}/`)
      .pipe(
        catchError((error) => {
          console.error('Delete data failed:', error);
          return throwError(() => error);
        })
      );
  }
}
