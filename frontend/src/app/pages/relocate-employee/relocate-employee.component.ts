import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Employee from 'src/app/models/employee';
import Office from 'src/app/models/office';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-relocate-employee',
  templateUrl: './relocate-employee.component.html',
  styleUrls: ['./relocate-employee.component.scss']
})
export class RelocateEmployeeComponent implements OnInit {

  companyId: string
  officeId: string
  employeeId: string
  offices: Office[] = [];

  currentOfficeId: string


  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    // private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId
      this.companyId = params.companyId
      this.employeeId = params.employeeId
    })
    this.officeService.getOfficees(this.companyId).subscribe((offices: Office[]) => this.offices = offices.filter((o: Office) => o._id !== this.officeId))
    console.log(this.offices);
    this.currentOfficeId = this.officeId
  }

  relocateEmployee(desiredOfficeId: string) {
    this.officeService.relocateEmployee(this.officeId, this.companyId, this.employeeId, desiredOfficeId)
      .subscribe((e: Employee) => {
        console.log(this.companyId, this.employeeId, this.officeId, desiredOfficeId);
        this.router.navigate([`company/${this.companyId}/offices/${this.officeId}/employees/${e._id}`])
      })
  }

  // onChange(value: Office) {
  //   this.currentOffice._id = value._id
  // }


  cancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
