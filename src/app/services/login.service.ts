import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginResponse {
  status: boolean;
  token: string;
  message: string;
  userData?: any;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map(response => {
          // Store token in localStorage if login is successful
          if (response.status && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userData', JSON.stringify(response.userData));
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}
