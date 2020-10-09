import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { NewOfficeComponent } from './pages/new-office/new-office.component';
import { OfficeViewComponent } from './pages/office-view/office-view.component';

const routes: Routes = [
  { path: 'company', component: OfficeViewComponent },
  { path: 'company/:companyId/offices', component: OfficeViewComponent },
  { path: 'new-company', component: NewCompanyComponent },
  { path: 'new-office', component: NewOfficeComponent },
  { path: 'new-employee', component: NewEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
