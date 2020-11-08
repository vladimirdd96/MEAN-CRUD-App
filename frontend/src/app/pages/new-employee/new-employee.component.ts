import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Employee from 'src/app/models/employee';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  companyId: string;
  officeId: string;

  selectedFile: File = null;

  experience = ['junior', 'mid', 'senior',]

  employeeFirstNameInput: string
  employeeLastNameInput: string
  employeeStaringDateInput: Date
  employeeSalaryInput: number
  employeeVacationDaysInput: number
  employeeExperienceInput: {
    junior: 'junior',
    mid: 'mid',
    senior: 'senior'
  }

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId;
      this.companyId = params.companyId;
    });
  }

  ngOnInit(): void { }

  addEmployee() {
    this.officeService
      .createEmployee(
        this.employeeFirstNameInput,
        this.employeeLastNameInput,
        this.employeeStaringDateInput,
        this.employeeSalaryInput,
        this.employeeVacationDaysInput,
        this.employeeExperienceInput,
        this.companyId,
        this.officeId
      )
      .subscribe((e: Employee) =>
        this.router.navigate([
          `./company/${this.companyId}/offices/${this.officeId}/employees/${e._id}`,
        ])
      );
  }

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload() {
  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  //   this.http
  //     .post('my-backend.com/file-upload', uploadData)
  //     .subscribe((event) => {
  //       console.log(event); // handle event here
  //     });
  // }

  cancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
