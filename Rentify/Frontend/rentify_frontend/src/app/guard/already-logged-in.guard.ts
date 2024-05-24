import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isLoggedIn()) {
      
      //this.router.navigate(['/404']);
      const userRole = localStorage.getItem('user_role');
      console.log(userRole)
      if (userRole === 'seller') {
        this.router.navigate(['/create-property/']);
      } else {
        this.router.navigate(['/properties/']);
      }
      return false;
    }
    return true;
  }
}
