import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(private router: Router) { }

  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500) {
      this.handle500Error(error);
    }
   if (error.status === 404) {
      this.handle404Error(error)
    }
  
  }

  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }
  // private handleOtherError = (error: HttpErrorResponse) => {
  //   this.createErrorMessage(error); //TODO: 
  // }

  private createErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}