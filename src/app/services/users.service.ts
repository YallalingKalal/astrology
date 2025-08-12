import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL =
    'https://abhishekregister.astromonk.co.in';
  // private BASE_URL = 'http://192.168.0.186:8001/auth/users/list_users/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.BASE_URL}/userregistration/user-registration/list_users/`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          // Try to refresh token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.get<any>(`${this.BASE_URL}/userregistration/user-registration/list_users/`, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  getUserById(userId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.BASE_URL}/userregistration/user-registration/retrieve_user/${userId}/`, { headers }).pipe(
       catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          // Try to refresh token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.get<any>(`${this.BASE_URL}/userregistration/user-registration/get_user/${userId}/`, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.BASE_URL}/userregistration/user-registration/update_user/${userId}/`, userData, { headers }).pipe(
       catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          // Try to refresh token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.get<any>(`${this.BASE_URL}/userregistration/user-registration/update_user/${userId}/`, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

 deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.BASE_URL}/userregistration/user-registration/delete_user/${userId}/`; // Adjust if your API expects a different URL
    return this.http.delete<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Delete user failed:', error);
        return throwError(() => error);
      })
    );
  }
}
