import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfficeViewComponent } from './pages/office-view/office-view.component';
import { NewOfficeComponent } from './pages/new-office/new-office.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { RelocateEmployeeComponent } from './pages/relocate-employee/relocate-employee.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    OfficeViewComponent,
    NewOfficeComponent,
    NewEmployeeComponent,
    NewCompanyComponent,
    RelocateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    RouterModule,
    CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
