import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private customerService: CustomerService) {}

  users!: Customer[];
  userIdToDelete!: number;

  public getUsers() {
    this.customerService.getCustomers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnInit() {
    this.getUsers();
  }
}
