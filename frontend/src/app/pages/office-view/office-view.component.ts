import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/gallery.service';
import { Gallery } from 'src/app/models/gallery';
import Company from '../../models/company';
import Employee from '../../models/employee';
import Office from '../../models/office';
import { OfficeService } from '../../office.service';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss'],
})
export class OfficeViewComponent implements OnInit {
  companies: Company[] = [];
  offices: Office[] = [];
  employees: Employee[] = [];
  galeries: Gallery[] = []

  companyId: string;
  officeId: string;
  employeeId: string;
  galleryId: string

  searchInput = '';
  newSearch = 'No Content';

  companiesSearch: Company[];
  officesSearch: Office[];
  employeeSearch: Employee[];

  selectedItemId: string;
  selectedEmployeeId: string;

  constructor(
    private officeService: OfficeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.officeService
      .getCompanies()
      .subscribe((companies: Company[]) => (this.companies = companies));

    this.route.params.subscribe((params: Params) => {
      this.companyId = params.companyId;
      this.officeId = params.officeId;
      this.selectedItemId = this.officeId;

      this.employeeId = params.employeeId;
      this.selectedEmployeeId = this.employeeId;

      if (!this.companyId) return;
      this.officeService
        .getOfficees(this.companyId)
        .subscribe((offices: Office[]) => {
          this.offices = offices = offices.filter(
            (o) => o._companyId === this.companyId
          );
        });
      if (!this.officeId || !this.companyId) return;
      this.officeService
        .getEmployees(this.companyId, this.officeId)
        .subscribe((employees: Employee[]) => (this.employees = employees));
    });

    this.officeService
      .getOfficeesSearch()
      .subscribe((o: Office[]) => (this.officesSearch = o));

    this.officeService
      .getEmployeesSearch()
      .subscribe((e: Employee[]) => (this.employeeSearch = e));
  }

  //Company

  deleteCompany(company: Company) {
    this.officeService
      .deleteCompany(company._id)
      .subscribe((_company: Company) => {
        this.companies.filter((c) => c._id !== _company._id);
        this.router.navigate(['../../']);
      });
  }

  getOffices(companyId: string) {
    if (!companyId || this.companyId === companyId) return;
    this.officeService.getOfficees(companyId).subscribe((offices: Office[]) => {
      this.offices = offices;
    });
  }

  //Office

  deleteOffice(office: Office) {
    this.officeService
      .deleteOffice(this.companyId, office._id)
      .subscribe(
        (_office: Office) =>
          (this.offices = this.offices.filter((o) => o._id !== _office._id))
      );
  }

  headquarters(office: Office) {
    this.officeService
      .headquarters(this.companyId, office)
      .subscribe(() => (office.headquarters = !office.headquarters));
  }

  addOfficeClick() {
    if (!this.companyId) {
      alert('Please select a company to add office to!');
      return;
    }
    this.router.navigate([`./company/${this.companyId}/new-office`]);
  }

  getEmployees(officeId: string) {
    if (!officeId || this.officeId === officeId) return;
    this.officeService
      .getEmployees(this.companyId, officeId)
      .subscribe(
        (employees: Employee[]) =>
          (this.employees = employees.filter(
            (employee: Employee) => employee._officeId === officeId
          ))
      );
    this.router.navigate([
      `./company/${this.companyId}/offices/${officeId}/employees`,
    ]);
  }

  //Employee

  onEmployeeClick(e: Employee) {
    this.employeeId = e._id;
    if (this.route.toString().includes(`/company/${this.companyId}/offices/${this.officeId}/employees/${this.employeeId}`)) return
    this.router.navigate([`/company/${this.companyId}/offices/${this.officeId}/employees/${this.employeeId}`])
  }

  addEmployeeClick() {
    if (!this.companyId || !this.officeId) {
      alert('Please select a office to add employee to!');
      return;
    }
    this.router.navigate([
      `./company/${this.companyId}/offices/${this.officeId}/new-employee`,
    ]);
  }

  deleteEmployee(employee: Employee) {
    this.officeService
      .deleteEmployee(this.companyId, this.officeId, employee._id)
      .subscribe(
        (employee: Employee) =>
          (this.employees = this.employees.filter(
            (e) => e._id !== employee._id
          ))
      );
    this.router.navigate([
      `./company/${this.companyId}/offices/${this.officeId}/employees/`,
    ]);
  }

  relocateEmployeeClick(employee: Employee) {
    if (!this.companyId || !this.officeId || !employee._id) {
      alert('First select company, office and employee to relocate!');
      return;
    }
    this.router.navigate([
      `./company/${this.companyId}/offices/${this.officeId}/employees/${employee._id}/relocate`,
    ]);
  }

  editEmployee(e: Employee) {
    if (!e) return;
    this.router.navigate([
      `/company/${this.companyId}/offices/${this.officeId}/employees/${this.employeeId}/add-photo`,
    ]);
  }

  onSearchInput = () => {
    const search = () => {
      this.newSearch = this.searchInput;
      const foundCompany = this.companies.find((c: Company) =>
        this.newSearch.toLowerCase().includes(c.name.toLowerCase())
      );

      const foundOffice = this.officesSearch.filter((o: Office) => {
        return (o.streetName.toLowerCase().includes(this.newSearch.toLowerCase()) ||
          o.cityName.toLowerCase().includes(this.newSearch.toLowerCase()) ||
          o.countryName.toLowerCase().includes(this.newSearch.toLowerCase()));
      });

      const foundEmployee = this.employeeSearch.filter((e: Employee) => {
        return (e.firstName.toLowerCase().includes(this.newSearch.toLowerCase()) ||
          e.lastName.toLowerCase().includes(this.newSearch.toLowerCase()));
      });

      if (foundCompany) {
        return this.officeService
          .getOfficees(foundCompany._id)
          .subscribe(() =>
            this.router.navigate([`company/${foundCompany._id}/offices`])
          );
      }

      if (foundOffice[0]) {
        return this.officeService
          .getEmployees(foundOffice[0]._companyId, foundOffice[0]._id)
          .subscribe(() =>
            this.router.navigate([
              `company/${foundOffice[0]._companyId}/offices/${foundOffice[0]._id}/employees`,
            ])
          );
      }

      if (foundEmployee[0]) {
        const companyForE = this.officesSearch.filter(
          (o: Office) =>
            foundEmployee[0]._officeId === o._id

        );
        return this.officeService
          .getEmployeeById(
            companyForE[0]._companyId,
            foundEmployee[0]._officeId,
            foundEmployee[0]._id
          )
          .subscribe((e: Employee) => {
            this.router.navigate([
              `/company/${companyForE[0]._companyId}/offices/${foundEmployee[0]._officeId}/employees/${foundEmployee[0]._id}`,
            ]);
          });
      }
    };
    setTimeout(search, 700)
  }
}
