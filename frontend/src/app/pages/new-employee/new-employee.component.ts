import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  companyId: string;
  officeId: string

  selectedFile: File = null

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId
      this.companyId = params.companyId
    })
  }

  ngOnInit(): void {
  }

  addEmployee(
    firstName: string,
    lastName: string,
    startingDate: Date,
    salary: number,
    vacationDays: number,
    experience:
      {
        junior: 'junior',
        mid: 'mid',
        senior: 'senior',
      }) {
    this.officeService.createEmployee(firstName, lastName, startingDate, salary, vacationDays, experience, this.officeId, this.companyId).subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }))
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.http.post('my-backend.com/file-upload', uploadData)
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }

  canselClick() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
