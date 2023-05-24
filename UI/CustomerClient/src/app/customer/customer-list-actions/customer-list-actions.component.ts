

import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, CustomerColumns } from 'src/app/interfaces/Customer';
import { CustomerRepositoryService } from 'src/app/shared/services/customer-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerForUpdate } from 'src/app/interfaces/CustomerForUpdate';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-customer-list-actions',
  templateUrl: './customer-list-actions.component.html',
  styleUrls: ['./customer-list-actions.component.css']
})
export class CustomerListActionsComponent implements AfterViewInit {

  displayedColumns: string[] = CustomerColumns.map((col) => col.key);
  columnsSchema: any = CustomerColumns;
  dataSource = new MatTableDataSource<Customer>();
  valid: any = {};

 
  customers: Customer[];
  currentCustomer: Customer;
  customerIndex: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizes = [5, 10, 20, 50];
  totalData: number;

  constructor(private repository: CustomerRepositoryService, private errorHandler: ErrorHandlerService, public dialog: MatDialog, private toastr: ToastrService) { }

  getTableData$(pageNumber: number, pageSize: number) {
    return this.repository.getCustomers(pageNumber, pageSize);
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((customerData) => {
          if (customerData == null) return [];
          return customerData;
        })
      )
      .subscribe({
        next: (result) =>{
          if(result.length == 0){
            this.toastr.warning("Items Not Found", 'Warning');
          }
          else{
            this.totalData = JSON.parse( result.headers.get('x-pagination')).TotalCount;
            this.dataSource= new MatTableDataSource(result.body);
          }
      
        } ,
        error: (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            if(err.status === 500){
              this.toastr.error(this.errorHandler.errorMessage, 'Error');
            }
            else
            {
              this.toastr.warning(this.errorHandler.errorMessage, 'Warning');
            }
        }
      })
  }
  


  editRow(customerRow: Customer) {
   
    const customerForUpd: CustomerForUpdate = {
      id: customerRow.id,
      firstName: customerRow.firstName,
      lastName: customerRow.lastName,
      email: customerRow.email
    }
 
      this.repository.updateCustomer(customerForUpd)
    .subscribe({
      next: (c: CustomerForUpdate) => {
        customerRow.isEdit = false;
        this.toastr.success('Customer updated', 'Success');
      },
      error: (err: HttpErrorResponse) => {
        
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
    sessionStorage.clear();
  } 


  removeRow(id: number) {
              this.repository.deleteCustomer(id)
              .subscribe({
                next: ( ) => {
                  this.dataSource.data = this.dataSource.data.filter(
                    (c: Customer) => c.id !== id,
                      )
                  this.toastr.success('Customer deleted', 'Success');
                },
                error: (err: HttpErrorResponse) => {
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
  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }
  cancelSubmit(id: number, index: number){
   this.currentCustomer = JSON.parse(sessionStorage.getItem(id.toString()));
 
     this.dataSource.data.at(index).firstName = this.currentCustomer.firstName;
     this.dataSource.data.at(index).lastName = this.currentCustomer.lastName;
     this.dataSource.data.at(index).email = this.currentCustomer.email;
     this.dataSource.data.at(index).isEdit = false;

     sessionStorage.clear();
  }
setSession(customer: Customer){
  sessionStorage.setItem(customer.id.toString(), JSON.stringify(customer))
}
  openDialog(id:number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
    data:{
        message: 'Do you want to delete this customer'
    }
    });
     
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
            this.removeRow(id);
        }
    });
  } 
 
 }