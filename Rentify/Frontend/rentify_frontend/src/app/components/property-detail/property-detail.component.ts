import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {
  property: any;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private router:Router) { }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
          this.propertyService.getProperty(parseInt(id, 10)).subscribe((data: any) => {
              this.property = data;
          });
      }
  }
  isUpdateVisible(): boolean {
    const userRole = localStorage.getItem('user_role');
    
    if (userRole === 'seller') {
      return true;
    } else {
      return false;
    }
  }
  
  updateProperty(prop_id:any) {
    this.router.navigate(['edit-property/',prop_id]); 
  }
  
}
