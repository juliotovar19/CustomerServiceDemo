import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListActionsComponent } from './customer-list-actions/customer-list-actions.component';

const routes: Routes = [
  { path: 'list-actions', component: CustomerListActionsComponent },
  { path: 'create', component: CustomerCreateComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
