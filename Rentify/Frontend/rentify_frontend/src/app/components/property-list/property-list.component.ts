import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterModule,NgxPaginationModule,FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = [];
  searchTerm: string = '';
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number
  fullyFurnishedChecked = false
  semiFurnishedChecked= false
  unfurnishedChecked = false
  loading: boolean = false; 

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe((data: any) => {
      this.properties = data;
      this.filteredProperties = this.properties;
    });
  }
    // Filter properties based on search term
    filterProperties(): void {
      
      let filteredBySearchTerm = this.properties;
      if (this.searchTerm) {
        filteredBySearchTerm = this.properties.filter(property =>
          property.place.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    
      // Filter by furnishing options
      this.filteredProperties = filteredBySearchTerm.filter(property => {
        if ((this.fullyFurnishedChecked && property.furnishing === 'fully-furnished') ||
            (this.semiFurnishedChecked && property.furnishing === 'semi-furnished') ||
            (this.unfurnishedChecked && property.furnishing === 'unfurnished')) {
          return true;
        } else if (!this.fullyFurnishedChecked && !this.semiFurnishedChecked && !this.unfurnishedChecked) {
          return true; 
        } else {
          return false;
        }
      });
    }
    

    // Pagination change event handler
    pageChanged(event: any): void {
      this.currentPage = event;
    }

  markInterested(propertyId: number, ownerId: number) {
    const userId = localStorage.getItem('user_id');
    
  
    if (userId !== null) {
      this.loading = true;
      this.propertyService.getUserDetails(userId).subscribe(
        buyerData => {
          this.propertyService.getUserDetails(ownerId).subscribe(
            sellerData => {
              const payload = {
                property_id: propertyId,
                buyer_details: {
                  name: buyerData.name,
                  phone: buyerData.phone,
                  email: buyerData.email
                },
                seller_details: {
                  name: sellerData.name,
                  phone: sellerData.phone,
                  email: sellerData.email
                }
              };

              this.sendInterest(payload);
            },
            error => this.handleError(error)
          );
        },
        error => this.handleError(error)
      );
    } else {
      console.error('User ID is null. Cannot proceed with markInterested.');
    }
  }

  sendInterest(payload: any) {
    this.propertyService.sendInterest(payload).subscribe(
      () => {
        this.loading = false;
        alert('Interest sent successfully!');
      },
      error => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
    this.loading = false;
  }


  clearFilters(){
    this.searchTerm = ''; 
    // this.fullyFurnishedChecked = false; 
    // this.semiFurnishedChecked = false;
    // this.unfurnishedChecked = false; 
    this.filterProperties();
  }
}
