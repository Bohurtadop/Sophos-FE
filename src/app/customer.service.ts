import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from './config/constants';
import { Customer } from './customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly customerUrl: string;

  constructor(private http: HttpClient, private constants: Constants) {
    this.customerUrl = constants.API_ENDPOINT.concat('/customer');
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  saveCustomer(customerData: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customerData);
  }
}
