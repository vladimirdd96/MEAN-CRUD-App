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
import { MatButtonToggle } from '@angular/material/button-toggle/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    OfficeViewComponent,
    NewOfficeComponent,
    NewEmployeeComponent,
    NewCompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
