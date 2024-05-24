import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    private apiURL = 'http://13.53.97.17:8000/api';

    constructor(private http: HttpClient) { }

    getProperties() {
        return this.http.get(`${this.apiURL}/properties/`);
    }

    getProperty(id: number) {
        return this.http.get(`${this.apiURL}/properties/${id}/`);
    }

    createProperty(property: any) {
        return this.http.post(`${this.apiURL}/properties/create/`, property);
    }

    updateProperty(id: number, property: any) {
        return this.http.put(`${this.apiURL}/properties/${id}/`, property);
    }

    deleteProperty(id: number) {
        return this.http.delete(`${this.apiURL}/properties/${id}/`);
    }
    getUserDetails(userId: string | number){
      return this.http.get<any>(`${this.apiURL}/users/${userId}`)
        .pipe(
          map((data: any) => {
            return {
              name: `${data.first_name} ${data.last_name}`,
              phone: data.phone_number,
              email: data.email
            };
          })
        );
    }
  
    sendInterest(payload: any) {
      return this.http.post<any>(`${this.apiURL}/properties/send-email/`,payload);
    }
}
