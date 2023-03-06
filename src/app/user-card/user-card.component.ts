import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user!: Customer;
  @Input() index!: number;
  @Output() updateUsers = new EventEmitter();
  users!: Customer[];
  userEditable: boolean = false;
  name: FormControl = new FormControl({
    value: '',
    disabled: !this.userEditable,
  });
  email: FormControl = new FormControl({
    value: '',
    disabled: !this.userEditable,
  });
  password: FormControl = new FormControl({
    value: '',
    disabled: !this.userEditable,
  });
  userForm = this.formBuilder.group({
    name: this.name,
    email: this.email,
    password: this.password,
  });

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.name.setValue(this.user.name);
    this.email.setValue(this.user.email);
    this.password.setValue(this.user.password);
  }

  deleteUser() {
    this.customerService.deleteCustomer(this.user.id!).subscribe((data) => {
      this.updateUsers.emit();
    });
  }

  editAndSaveUser() {
    if (this.userEditable) {
      const { name, email, password } = this.userForm.value;
      const updatedCustomer: Customer = {
        id: this.user.id,
        name: name!,
        email: email!,
        password: password!,
      };
      this.customerService.updateCustomer(updatedCustomer).subscribe((data) => {
        this.updateUsers.emit();
      });
    }
    this.userEditable = !this.userEditable;
    this.userEditable ? this.userForm.enable() : this.userForm.disable();
  }
}
