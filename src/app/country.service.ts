import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) {

   }
   getAllCountries(){
    return this.http.get('http://localhost:3000/data')
   }
}
