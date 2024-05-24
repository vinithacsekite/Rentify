import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Property } from '../../models/new-property.model'; 
import { PropertyService } from '../../services/property.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.css'
})
export class PropertyCreateComponent {
  propertyForm!: FormGroup; 
  properties: any [] = [];
  message: string | null = null;
  messageClass: string | null = null;


  constructor(private fb: FormBuilder, private propertyService: PropertyService,private router: Router) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      place: ['', Validators.required],
      square_area: ['', Validators.required],
      BHK: ['', Validators.required],
      bathroom: ['', Validators.required],
      // hospitals_nearby: ['', Validators.required],
      // colleges_nearby: ['', Validators.required],
      // photos: [''], 
      price: ['', Validators.required],
      furnishing: ['', Validators.required],
      //parking: [false],
      // owner: ['', Validators.required],
    });

 
  this.refresh()
    
  }

  refresh(){
    this.propertyService.getProperties().subscribe((data: any) => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
          // Filter properties based on owner ID
          this.properties = data.filter((property: any) => property.owner === parseInt(userId));
      } else {
          
          console.error('User ID is not available in local storage.');
      }
    });
  }
  createProperty() {
    if (this.propertyForm.valid) {
        const newProperty: Property = {
        place: this.propertyForm.get('place')?.value,
        square_area: this.propertyForm.get('square_area')?.value,
        BHK: this.propertyForm.get('BHK')?.value,
        bathroom: this.propertyForm.get('bathroom')?.value,
        hospitals_nearby: this.propertyForm.get('hospitals_nearby')?.value,
        colleges_nearby: this.propertyForm.get('colleges_nearby')?.value,
        photos: this.propertyForm.get('photos')?.value === "" ? null : this.propertyForm.get('photos')?.value,
        price: this.propertyForm.get('price')?.value,
        furnishing: this.propertyForm.get('furnishing')?.value,
        parking: this.propertyForm.get('parking')?.value,
        owner: Number(localStorage.getItem('user_id')),
      };
     
      // Call createProperty function of PropertyService
      this.propertyService.createProperty(newProperty).subscribe(
        () => {
          console.log('Property created successfully.');
          this.message = 'Property has been added';
          this.messageClass = 'success';
          this.refresh()
          this.propertyForm.reset(); 
        },
        (error) => {
          this.message = 'Error creating property';
          this.messageClass = 'error';
          console.error('Failed to create property:', error);
        }
      );
    }
  }
}
