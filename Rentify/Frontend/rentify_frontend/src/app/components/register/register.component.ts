import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../../models/new-user.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone_number: ['', Validators.required],
      type_of_user: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const newUser: NewUser = {
        first_name: this.registerForm.get('first_name')?.value,
        last_name: this.registerForm.get('last_name')?.value,
        email: this.registerForm.get('email')?.value,
        phone_number: this.registerForm.get('phone_number')?.value,
        password: this.registerForm.get('password')?.value,
        type_of_user: this.registerForm.get('type_of_user')?.value
      };

      this.authService.register(newUser).subscribe(
        () => {
          console.log("Registered successfully");
          this.router.navigate(['/']); 
         
        },
        (error) => {
          console.error("Registration failed", error);
        }
      );
    }
  }
}
