import { Injectable } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerForCreation } from 'src/app/interfaces/CustomerForCreation';
import { CustomerForUpdate } from 'src/app/interfaces/CustomerForUpdate';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerRepositoryService {

  apiAddress: string = 'api/Customer';
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getCustomers (pageNumber: number, pageSize: number): Observable<any> {
    const href = this.createCompleteRoute(this.apiAddress, this.envUrl.urlAddress);
    const requestUrl = `${href}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(requestUrl, { observe: 'response' });
  }

  public createCustomer (Customer: CustomerForCreation): Observable<CustomerForCreation> {
    return this.http.post<CustomerForCreation>(this.createCompleteRoute(this.apiAddress, this.envUrl.urlAddress), Customer, this.generateHeaders());
  }

  public updateCustomer (Customer: CustomerForUpdate): Observable<any>{
    return this.http.put(this.createCompleteRoute(this.apiAddress, this.envUrl.urlAddress), Customer, this.generateHeaders());
  }

  public deleteCustomer (id: number): Observable<any> {
    const href = this.createCompleteRoute(this.apiAddress, this.envUrl.urlAddress);
    const requestUrl = `${href}/${id}`;
    return this.http.delete(requestUrl);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
