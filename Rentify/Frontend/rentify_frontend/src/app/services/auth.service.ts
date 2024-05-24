import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewUser } from '../models/new-user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://13.53.97.17:8000/api/users/login/';
  private registerUrl = 'http://13.53.97.17:8000/api/users/register/';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<{ token: boolean, user_id?: number }> {
    return this.http.post<any>(this.loginUrl, { email, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status === 200) {
            const body = res.body;
            if (body && body.user_id) {
              // Save user_id to local storage
              localStorage.setItem('user_id', body.user_id.toString());
              localStorage.setItem('user_role', body.user_role.toString());
              localStorage.setItem('session_login', 'true');
              return { token: true };
            } else {
              console.error('User ID not found in the response');
              return { token: false };
            }
          } else {
            // If login is unsuccessful, return token only
            return { token: false };
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          return of({ token: false });
        })
      );
  }

  register(user: NewUser): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('session_login');
    if (token) {
      return true
    }
    return false
    
  }
 
  logout() {
    localStorage.removeItem('session_login');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    this.router.navigate(['/']);
  }


}
