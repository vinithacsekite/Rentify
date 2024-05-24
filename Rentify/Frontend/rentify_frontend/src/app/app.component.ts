import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyCreateComponent } from './components/property-create/property-create.component';
import { PropertyEditComponent } from './components/property-edit/property-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            LoginComponent,
            RegisterComponent,
            PropertyListComponent,
            PropertyDetailComponent,
            PropertyCreateComponent,
            PropertyEditComponent,
            HeaderComponent,
            NotFoundComponent,
            NgxPaginationModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rentify_frontend';
}
