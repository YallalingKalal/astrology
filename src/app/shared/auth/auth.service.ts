import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, switchMap, EMPTY, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly REFRESH_INTERVAL = 60 * 60 * 1000; // 60 minutes in milliseconds
  private refreshSubscription: any;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshing = false;
  private url = 'https://abhishekregister.astromonk.co.in/';
  private refreshTokenUrl = `${this.url}/auth/refresh/`;
  private loginUrl = `${this.url}auth/auth/admin_login/`;
  private logoutUrl = `${this.url}auth/auth/logout/`;

  // Track current user role with BehaviorSubject
  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.setupRefreshTimer();
  }

  private setupRefreshTimer(): void {
    // Clear any existing subscription to avoid duplicates
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }

    if (!this.isAuthenticated()) {
      return; // Don't set up timer if not authenticated
    }

    // Refresh 5 minutes before token expires
    const refreshTime = this.REFRESH_INTERVAL - 5 * 60 * 1000;

    this.refreshSubscription = timer(refreshTime)
      .pipe(
        switchMap(() => {
          // Only refresh if still authenticated
          if (this.isAuthenticated()) {
            return this.refreshToken();
          }
          return EMPTY;
        }),
        catchError((error) => {
          console.error('Token refresh failed:', error);
          this.clearTokens();
          return EMPTY;
        })
      )
      .subscribe();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap((response) => {
        if (response.status === 'success' && response.data) {
          const user = response.data.user;
          localStorage.setItem('id', user.id.toString());
          localStorage.setItem('email', user.email);
          localStorage.setItem('first_name', user.first_name);
          localStorage.setItem('last_name', user.last_name);
          localStorage.setItem('role', user.role);
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);

          // THIS IS CRUCIAL:
          if (user.responsibilities && Array.isArray(user.responsibilities)) {
            localStorage.setItem(
              'responsibilities',
              JSON.stringify(user.responsibilities)
            );
          }

          // Update role subject
          this.userRoleSubject.next(user.role);

          this.setupRefreshTimer();
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  logout(refreshToken: string): Observable<any> {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(this.logoutUrl, { refresh_token: refreshToken }, { headers })
      .pipe(
        tap(() => {
          this.clearTokens();
        })
      );
  }

  refreshToken(): Observable<any> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.asObservable();
    }

    this.isRefreshing = true;
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.clearTokens();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<any>(this.refreshTokenUrl, { refresh: refreshToken })
      .pipe(
        tap((response) => {
          this.isRefreshing = false;
          if (response.access) {
            localStorage.setItem('access_token', response.access);
            this.refreshTokenSubject.next(response.access);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.isRefreshing = false;
          if (error.error?.code === 'token_not_valid') {
            this.clearTokens();
          }
          return throwError(() => error);
        })
      );
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  getUserName(): string {
    const userData = this.getUserData();
    return userData?.first_name || userData?.email || '';
  }

  getUserRole(): any | null {
    const userData = this.getUserData();
    return userData?.role || null;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // localStorage.removeItem('user_data');
    this.refreshTokenSubject.next(null);
    this.userRoleSubject.next(null);
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  // Get redirect URL based on role
  getRedirectUrlByRole(): string {
    const role = this.getUserRole();
    switch (role) {
      case 'SUPER_ADMIN':
        return '/dashboard';
      case 'DOCTOR':
        return '/allprescriptions';
      default:
        return '/login';
    }
  }

  getUserData(): any {
    // Reconstruct user data from individual items
    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');
    const role = localStorage.getItem('role');

    if (!id || !role) return null;

    return {
      id,
      email,
      first_name,
      last_name,
      role,
    };
  }

  getUserResponsibilities(): string[] {
    const responsibilities = localStorage.getItem('responsibilities');
    const result = responsibilities ? JSON.parse(responsibilities) : [];
    console.log('Retrieved responsibilities:', result); // Debug info
    return result;
  }

  hasResponsibility(responsibility: string): boolean {
    const userResponsibilities = this.getUserResponsibilities();
    return userResponsibilities.includes(responsibility);
  }
}
