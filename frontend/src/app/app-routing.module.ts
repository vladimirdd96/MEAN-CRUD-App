import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { NewOfficeComponent } from './pages/new-office/new-office.component';
import { OfficeViewComponent } from './pages/office-view/office-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/company', pathMatch: 'full' },
  { path: 'company', component: OfficeViewComponent },
  { path: 'company/:companyId/offices', component: OfficeViewComponent },
  { path: 'company/:companyId/offices/:officeId/employees', component: OfficeViewComponent },
  { path: 'company/:companyId/offices/:officeId/employees/:employeeId', component: OfficeViewComponent },
  { path: 'company/new-company', component: NewCompanyComponent },
  { path: 'company/:companyId/new-office', component: NewOfficeComponent },
  { path: 'company/:companyId/offices/:officeId/new-employee', component: NewEmployeeComponent },
  { path: '**', redirectTo: '/company', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
