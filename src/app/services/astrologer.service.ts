import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AstrologerService {
  private readonly BASE_URL = 'https://abhishekregister.astromonk.co.in/userregistration/astrologers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  // Get all astrologers
  getAstrologers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Get astrologers failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Get astrologer by ID
  getAstrologerById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}/`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Get astrologer by ID failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Add new astrologer
  addAstrologer(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/`, data, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Add astrologer failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Update astrologer
  updateAstrologer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}/`, data, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Update astrologer failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Delete astrologer
  deleteAstrologer(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}/`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Delete astrologer failed:', error);
        return throwError(() => error);
      })
    );
  }
}
