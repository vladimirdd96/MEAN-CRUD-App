import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfficeViewComponent } from './pages/office-view/office-view.component';
import { NewOfficeComponent } from './pages/new-office/new-office.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelocateEmployeeComponent } from './pages/relocate-employee/relocate-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { GalleryDetailsComponent } from './pages/gallery-details/gallery-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OfficeViewComponent,
    NewOfficeComponent,
    NewEmployeeComponent,
    NewCompanyComponent,
    RelocateEmployeeComponent,
    SearchComponent,
    GalleryComponent,
    GalleryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,

    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
