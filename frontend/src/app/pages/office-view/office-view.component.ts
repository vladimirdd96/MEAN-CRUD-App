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
  employeeId: string

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
      this.employeeId = params.employeeId;
      if (!this.companyId) return
      this.officeService.getOfficees(this.companyId).subscribe((offices: Office[]) => this.offices = offices)
      if (!this.officeId) return
      this.officeService.getEmployees(this.companyId, this.officeId).subscribe((employees: Employee[]) => this.employees = employees)
    })
  }

  deleteCompany(company: Company) {
    this.officeService.deleteCompany(company._id)
      .subscribe((_company: Company) => {
        this.companies.filter(c => c._id !== _company._id)
        this.router.navigate(['../../'])
      })
  }



  getOffices(company) {
    this.officeService.getOfficees(company).subscribe((offices: Office[]) => this.offices = offices)

  }
  deleteOffice(office: Office) {
    this.officeService.deleteOffice(this.companyId, office._id)
      .subscribe((_office: Company) => this.offices = this.offices.filter(c => c._id !== _office._id))

  }

  addOfficeClick() {
    if (!this.companyId) {
      alert('Please select a company to add office to!')
      return;
    }
    this.router.navigate([`./new-office`], { relativeTo: this.route })
  }



  getEmployees(office: Office) {
    this.officeService.getEmployees(this.companyId, office._id).subscribe((employees: Employee[]) => this.employees = employees)
    this.router.navigate([`./${office._id}/employees`], { relativeTo: this.route })
  }

  addEmployeeClick() {
    if (!this.companyId || !this.officeId) {
      alert('Please select a company to add office to!');
      return
    }
    this.router.navigate(['./new-employee'], { relativeTo: this.route })
  }

  deleteEmployee(employee: Employee) {
    this.officeService.deleteEmployee(this.companyId, this.officeId, employee._id).subscribe((employee: Employee) => this.employees.filter(e => e._id !== employee._id))
  }

  relocateEmployee(employee: Employee) { }
}
