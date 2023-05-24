//import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
//import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { CustomerRepositoryService } from 'src/app/shared/services/customer-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerForCreation } from 'src/app/interfaces/CustomerForCreation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  errorMessage: string = '';
  customerForm: FormGroup;
  constructor(private repository: CustomerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required])
    });
  }

  validateControl = (controlName: string) => {
    if (this.customerForm.get(controlName).invalid && this.customerForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.customerForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createCustomer = (customerFormValue) => {
    if (this.customerForm.valid)
      this.executeCustomerCreation(customerFormValue);
  }

  private executeCustomerCreation = (customerFormValue) => {
    const customer: CustomerForCreation = {
     
      firstName: customerFormValue.firstName,
      lastName: customerFormValue.lastName,
      email: customerFormValue.email

    }

    
    this.repository.createCustomer(customer)
    .subscribe({
      next: (c: CustomerForCreation) => {
      
        this.customerForm.reset();
        this.toastr.success('Customer created', 'Success');
      },
      error: (err: HttpErrorResponse) => {
        //debugger;
          this.errorHandler.handleError(err);
          if(err.status === 500){
            this.toastr.error(this.errorHandler.errorMessage, 'Error');
          }
          else
          {
            this.toastr.warning(this.errorHandler.errorMessage, 'Warning');
          }
          
      }
    });
  
  }

  redirectToCustomerList = () => {
    this.router.navigate(['/customer/list-actions']);
  }

}
