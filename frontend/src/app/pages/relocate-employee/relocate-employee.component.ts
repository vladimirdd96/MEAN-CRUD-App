import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Employee from 'src/app/models/employee';
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


  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    // private http: HttpClient
  ) {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId
      this.companyId = params.companyId
      this.employeeId = params.employeeId
    })
  }

  ngOnInit(): void {
  }

  relocateEmployee(officeCity: string, officeStreet: string) {
    this.officeService.relocateEmployee(this.officeId, this.companyId, this.employeeId, officeCity, officeStreet)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }))
  }

}
