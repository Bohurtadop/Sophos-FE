import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private customerService: CustomerService) {}

  users!: Customer[];

  ngOnInit() {
    this.customerService
      .getCustomers()
      .subscribe((data) => (this.users = data));
  }
}
