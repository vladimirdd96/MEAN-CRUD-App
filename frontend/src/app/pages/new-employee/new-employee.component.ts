import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Employee from 'src/app/models/employee';
import { OfficeService } from 'src/app/office.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  companyId: string;
  officeId: string;

  selectedFile: File = null;

  galleryForm: FormGroup;
  imageFile: File = null;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private api: ApiService,
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId;
      this.companyId = params.companyId;
    });
  }

  ngOnInit(): void {
    this.galleryForm = this.formBuilder.group({
      imageFile: [null, Validators.required],
      imageTitle: [null, Validators.required],
      imageDesc: [null, Validators.required],
    });
  }

  addEmployee(
    firstName: string,
    lastName: string,
    startingDate: Date,
    salary: number,
    vacationDays: number,
    experience: {
      junior: 'junior';
      mid: 'mid';
      senior: 'senior';
    }
  ) {
    this.officeService
      .createEmployee(
        firstName,
        lastName,
        startingDate,
        salary,
        vacationDays,
        experience,
        this.companyId,
        this.officeId
      )
      .subscribe((e: Employee) =>
        this.router.navigate([
          `./company/${this.companyId}/offices/${this.officeId}/employees/${e._id}`,
        ])
      );
    this.onFormSubmit();
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.api
      .addGallery(
        this.galleryForm.value,
        this.galleryForm.get('imageFile').value._files[0]
      )
      .subscribe(
        (res: any) => {
          this.isLoadingResults = false;
          if (res.body) {
            // this.router.navigate(['/gallery-details', res.body._id]);
          }
        },
        (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  cancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
