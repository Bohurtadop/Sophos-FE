import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { CustomerForm, Customer } from '../customer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        'submit',
        (event) => {
          if (!(form as HTMLFormElement).checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            this.onSubmit();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  }

  checkoutForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
  });

  onSubmit(): void {
    const { name, email, password } = this.checkoutForm.value;
    const newCustomer: Customer = {
      name: name!,
      email: email!,
      password: password!,
    };
    this.customerService.saveCustomer(newCustomer).subscribe((data) => {
      console.warn('Customer was registered succesfully: ', data);
      this.success = true;
    });
  }

  newRegistration(): void {
    this.success = false;
    this.checkoutForm.reset();
  }
}
