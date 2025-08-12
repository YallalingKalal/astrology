import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // <-- Add throwError here
import { catchError, switchMap } from 'rxjs/operators'; // <-- Add catchError and switchMap here
import { AuthService } from '../shared/auth/auth.service';

export interface Temple {
  id?: string; // id is optional for add, required for update/delete
  name: string;
  location: string;
  subtitle: string;
  description: string;
  image: string; // base64 string or image URL
  services: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TempleService {
  private readonly BASE_URL = 'http://192.168.0.186:8001';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Refresh token logic
  private refreshToken(): Observable<any> {
    return this.authService.refreshToken();
  }

  // Get all temples
  getTemples(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.BASE_URL}/api/abhishek/temples/`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.get(`${this.BASE_URL}/abhishek/temples/`, {
                headers: newHeaders,
              });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  // Get a single temple by ID
  getTempleById(id: string): Observable<Temple> {
    return this.http.get<Temple>(`${this.BASE_URL}${id}/`);
  }

  // Add a new temple
  addTemple(templeData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(`${this.BASE_URL}/api/abhishek/temples/`, templeData, { headers })
      .pipe(
        catchError((error) => {
          if (error.status === 401 && error.error.code === 'token_not_valid') {
            return this.refreshToken().pipe(
              switchMap(() => {
                const newToken = localStorage.getItem('access_token');
                const newHeaders = new HttpHeaders({
                  Authorization: `Bearer ${newToken}`,
                });
                return this.http.post(
                  `${this.BASE_URL}/api/abhishek/temples/`,
                  templeData,
                  { headers: newHeaders }
                );
              })
            );
          }
          return throwError(() => error);
        })
      );
  }

  // Update an existing temple
  updateTemple(id: string, templeData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put(`${this.BASE_URL}/api/abhishek/temples/${id}/`, templeData, { headers })
      .pipe(
        catchError((error) => {
          if (error.status === 401 && error.error.code === 'token_not_valid') {
            return this.refreshToken().pipe(
              switchMap(() => {
                const newToken = localStorage.getItem('access_token');
                const newHeaders = new HttpHeaders({
                  Authorization: `Bearer ${newToken}`,
                });
                return this.http.put(
                  `${this.BASE_URL}/api/abhishek/temples/${id}/`,
                  templeData,
                  { headers: newHeaders }
                );
              })
            );
          }
          return throwError(() => error);
        })
      );

  }

  // Delete a temple
  deleteTemple(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.BASE_URL}/api/abhishek/temples/${id}/`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.delete(`${this.BASE_URL}/api/abhishek/temples/${id}/`, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
