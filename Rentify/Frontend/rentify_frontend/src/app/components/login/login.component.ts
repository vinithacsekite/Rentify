import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
      this.loginForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password) {
      this.authService.login(email, password).subscribe(
        (tokens: { token: boolean } | boolean) => {
          if (typeof tokens === 'object' && tokens.token) {
            // Handle successful login
            console.log('Login successful');
            this.errorMessage = '';
            const userRole = localStorage.getItem('user_role');
            console.log(userRole)
            if (userRole === 'seller') {
              this.router.navigate(['/create-property/']);
            } else {
              this.router.navigate(['/properties/']);
            }
           
          } else {
            // Handle login failure
            console.log('Login failed');
            this.errorMessage = 'Invalid email or password';
          }
        },
        (error: any) => {
          // Handle error
          console.error('Login error', error);
          this.errorMessage = 'Login Error';
        }
      );
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
