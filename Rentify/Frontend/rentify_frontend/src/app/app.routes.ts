import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyCreateComponent } from './components/property-create/property-create.component';
import { PropertyEditComponent } from './components/property-edit/property-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { AlreadyLoggedInGuard } from './guard/already-logged-in.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent,canActivate: [AlreadyLoggedInGuard] },
    { path: 'register', component: RegisterComponent,canActivate: [AlreadyLoggedInGuard]},
    { path: 'properties', component: PropertyListComponent,canActivate: [AuthGuard]},
    { path: 'properties/:id', component: PropertyDetailComponent ,canActivate: [AuthGuard]},
    { path: 'create-property', component: PropertyCreateComponent, canActivate: [AuthGuard,RoleGuard]},
    { path: 'edit-property/:id', component: PropertyEditComponent, canActivate: [AuthGuard,RoleGuard]},
    { path: 'header', component: HeaderComponent},
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
