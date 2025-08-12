import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';

export interface Temple {
  id?: string;
  name: string;
  location: string;
  subtitle: string;
  description: string;
  image: string;
  services: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TempleService {
  private readonly BASE_URL = 'https://abhishekregister.astromonk.co.in/abhishek/temples';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private refreshToken(): Observable<any> {
    return this.authService.refreshToken();
  }

  getTemples(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.BASE_URL}/`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.get(`${this.BASE_URL}/`, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  getTempleById(id: string): Observable<Temple> {
    return this.http.get<Temple>(`${this.BASE_URL}/${id}/`);
  }

  addTemple(templeData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(`${this.BASE_URL}/`, templeData, { headers })
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
                  `${this.BASE_URL}/`,
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

  updateTemple(id: string, templeData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put(`${this.BASE_URL}/${id}/`, templeData, { headers })
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
                  `${this.BASE_URL}/${id}/`,
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

  deleteTemple(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.BASE_URL}/${id}/`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('access_token');
              const newHeaders = new HttpHeaders({
                Authorization: `Bearer ${newToken}`,
              });
              return this.http.delete(`${this.BASE_URL}/${id}/`, { headers: newHeaders });
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
