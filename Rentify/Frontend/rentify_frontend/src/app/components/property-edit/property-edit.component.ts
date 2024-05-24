import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './property-edit.component.html',
  styleUrl: './property-edit.component.css'
})
export class PropertyEditComponent {
  propertyForm: FormGroup;
  errorMessages: string[] = [];
  propertyId!: number; 

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private propertyService: PropertyService,private router:Router) {
      this.propertyForm = this.fb.group({
          place: ['', Validators.required],
          square_area: ['', Validators.required],
          BHK: ['', Validators.required],
          bathroom: ['', Validators.required],
          hospitals_nearby: ['', Validators.required],
          colleges_nearby: ['', Validators.required],
          photos: ['', Validators.required],
          price: ['', Validators.required],
          furnishing: ['', Validators.required],
          parking: [false],
          owner: ['', Validators.required],
      });
  }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
          this.propertyId = parseInt(id, 10);
          this.propertyService.getProperty(this.propertyId).subscribe((data: any) => {
              this.propertyForm.patchValue(data);
          });
      } else {
          // Handle the case when 'id' is null, such as redirecting to an error page
      }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Handle the file, e.g., upload it to the server or read its content
      console.log(file);
    }
  }

  confirmUpdate(){
    if (confirm("Are you sure you want to update?")) {
      this.updateProperty();
    }
  }
  confirmDelete(){
    if (confirm("Are you sure you want to Delete?")) {
      this.deleteProperty();
    }
  }

  updateProperty(): void {
    if (this.propertyForm.valid) {
  
      this.propertyService.updateProperty(this.propertyId, this.propertyForm.value).subscribe(
        response => {
          // Handle successful response if needed
          console.log('Property updated successfully', response);
          this.errorMessages = []; 
        },
        (error: HttpErrorResponse) => {
          // Handle error response
          this.errorMessages = [];
          if (error.error && typeof error.error === 'object') {
            for (const [key, value] of Object.entries(error.error)) {
              if (Array.isArray(value)) {
                value.forEach(msg => this.errorMessages.push(`${key}: ${msg}`));
              } else {
                this.errorMessages.push(`${key}: ${value}`);
              }
            }
          } else {
            this.errorMessages.push('An unexpected error occurred. Please try again.');
          }
          console.error('Error updating property', error);
        }
      );
    }
  }

  deleteProperty(){
    this.propertyService.deleteProperty(this.propertyId).subscribe(
      response => {
        // Handle successful response if needed
        console.log('Property deleted successfully', response);
        this.errorMessages = []; 
        this.router.navigate(['/create-property']);
      },
      (error: HttpErrorResponse) => {
        // Handle error response
        this.errorMessages = [];
        if (error.error && typeof error.error === 'object') {
          for (const [key, value] of Object.entries(error.error)) {
            if (Array.isArray(value)) {
              value.forEach(msg => this.errorMessages.push(`${key}: ${msg}`));
            } else {
              this.errorMessages.push(`${key}: ${value}`);
            }
          }
        } else {
          this.errorMessages.push('An unexpected error occurred. Please try again.');
        }
        console.error('Error updating property', error);
      }
    );

  }
}
