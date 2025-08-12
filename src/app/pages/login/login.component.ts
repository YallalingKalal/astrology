import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/auth/auth.service';

@Component({ 
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loginSuccess = false;
  errorMessage = '';
  isLoading = false;
  private apiUrl = 'https://abhishekregister.astromonk.co.in/auth/auth/admin_login/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // Inject AuthService if needed
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            // Fix: Use response.response instead of response.data
            if (
              response &&
              response.response &&
              response.response.access_token
            ) {
              this.loginSuccess = true;
              // Store token and user data
              localStorage.setItem(
                'access_token',
                response.response.access_token
              );
              localStorage.setItem(
                'refresh_token',
                response.response.refresh_token
              );
              localStorage.setItem(
                'userData',
                JSON.stringify(response.response.user)
              );
              // Navigate to dashboard
              this.router.navigate(['/dashboard']);
            } else {
              this.errorMessage = response.message || 'Login failed';
            }
          },
          error: (error) => {
            this.loginSuccess = false;
            this.errorMessage =
              error.error?.message || 'Login failed. Please try again.';
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  navigateToUserReg() {
    this.router.navigate(['/userregistration']);
  }
}
