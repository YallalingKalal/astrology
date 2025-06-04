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
import { LoginService } from '../../services/login.service';

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

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.status) {
            this.loginSuccess = true;
            // Navigate to dashboard after successful login
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.loginSuccess = false;
          this.errorMessage =
            error.error.message || 'Login failed. Please try again.';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
