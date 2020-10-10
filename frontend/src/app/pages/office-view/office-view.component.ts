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
      this.officeService.getOfficees(this.companyId).subscribe((offices: Office[]) => {
        this.offices = offices = offices.filter((o) => o._companyId === this.companyId)
      })
      if (!this.officeId || !this.companyId) return
      this.officeService.getEmployees(this.companyId, this.officeId).subscribe((employees: Employee[]) => this.employees = employees)
    })
  }

  //Company

  deleteCompany(company: Company) {
    this.officeService.deleteCompany(company._id)
      .subscribe((_company: Company) => {
        this.companies.filter(c => c._id !== _company._id)
        this.router.navigate(['../../'])
      })
  }

  getOffices(companyId: string) {
    if (!companyId) return
    this.officeService.getOfficees(companyId).subscribe((offices: Office[]) => {
      this.offices = offices = offices.filter((o) => o._companyId === companyId)
    })

  }

  //Office

  deleteOffice(office: Office) {
    this.officeService.deleteOffice(this.companyId, office._id)
      .subscribe((_office: Company) => this.offices = this.offices.filter(c => c._id !== _office._id))

  }

  headquarters(offices: Office[], office: Office) {
    this.officeService.headquarters(this.companyId, offices, office)
  }

  addOfficeClick() {
    if (!this.companyId) {
      alert('Please select a company to add office to!')
      return;
    }
    this.router.navigate([`./company/${this.companyId}/new-office`])
  }

  getEmployees(officeId: string) {
    if (!officeId) return
    this.officeService.getEmployees(this.companyId, officeId).subscribe((employees: Employee[]) => this.employees = employees
      .filter((employee: Employee) => employee._officeId === officeId))
    this.router.navigate([`./company/${this.companyId}/offices/${officeId}/employees`])
  }

  //Employee

  addEmployeeClick() {
    if (!this.companyId || !this.officeId) {
      alert('Please select a office to add employee to!');
      return
    }
    this.router.navigate([`./company/${this.companyId}/offices/${this.officeId}/new-employee`])
  }

  deleteEmployee(employee: Employee) {
    this.officeService.deleteEmployee(this.companyId, this.officeId, employee._id).subscribe((employee: Employee) => this.employees = this.employees.filter(e => e._id !== employee._id))
    this.router.navigate([`./company/${this.companyId}/offices/${this.officeId}/employees/`])
  }

  relocateEmployee(employee: Employee) {

  }
}
