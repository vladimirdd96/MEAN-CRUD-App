import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Company from "../../models/company"
import Employee from '../../models/employee';
import Office from '../../models/office';
import { OfficeService } from '../../office.service'


@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss']
})
export class OfficeViewComponent implements OnInit {

  companies: Company[] = [];
  offices: Office[] = [];
  employees: Employee[] = [];

  companyId: string
  officeId: string
  employee: Employee

  constructor(
    private officeService: OfficeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.officeService.getCompanies().subscribe((companies: Company[]) => this.companies = companies);

    this.route.params.subscribe((params: Params) => {
      this.companyId = params.companyId
      this.officeId = params.officeId;
      this.employee._id = params.employeeId;
      console.log(this.companyId);
      if (!this.companyId) return
      this.officeService.getOfficees(this.companyId).subscribe((offices: Office[]) => this.offices = offices)
    })
  }

  deleteCompany(company: Company) { }



  getOffices() {
    this.officeService.getOfficees(this.companyId).subscribe((offices: Office[]) => this.offices = offices)

  }
  deleteOffice(office: Office) { }

  addOfficeClick() {
    this.router.navigate(['/new-office'])
  }



  getEmployee() {
    this.officeService.getEmployee(this.companyId, this.officeId).subscribe((employees: Employee[]) => this.employees = employees)
  }

  addEmployeeClick() {
    this.router.navigate(['/new-employee'], { relativeTo: this.route })
  }

  deleteEmployee(employee: Employee) {
    this.officeService.deleteEmployee(this.companyId, this.officeId, employee)
  }

  relocateEmployee(employee: Employee) { }
}
