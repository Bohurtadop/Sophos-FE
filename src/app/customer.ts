import { FormControl } from '@angular/forms';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  password: string;
}

type ICustomerForm<T> = {
  [K in keyof T]?: any;
};

export var CustomerForm: ICustomerForm<Customer> = {
  id: '',
  name: '',
  email: '',
  password: '',
};
