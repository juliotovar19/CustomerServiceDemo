import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomerListActionsComponent } from './customer-list-actions/customer-list-actions.component';

import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  MatPaginatorModule } from '@angular/material/paginator';





@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerListActionsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule
  ],
  bootstrap: [CustomerListActionsComponent]

})
export class CustomerModule { }
