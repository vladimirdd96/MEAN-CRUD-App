import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import Company from 'src/app/models/company';
import Employee from 'src/app/models/employee';
import Office from 'src/app/models/office';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  companiesSearch: Company[] = [];
  officesSearch: Office[] = [];
  employeesSearch: Employee[] = [];

  searchInput = '';
  newSearch = 'No Content';

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.officeService
      .getCompaniesSearch()
      .subscribe(
        (companiesSearch: Company[]) => (this.companiesSearch = companiesSearch)
      );
    console.log(`companiesSearch: ${this.companiesSearch}`);
    this.officeService
      .getOfficeesSearch()
      .subscribe(
        (officesSearch: Office[]) => (this.officesSearch = officesSearch)
      );
    console.log(`officesSearch: ${this.officesSearch}`);
    this.officeService
      .getEmployeesSearch()
      .subscribe(
        (employeesSearch: Employee[]) =>
          (this.employeesSearch = employeesSearch)
      );
    console.log(`employeesSearch: ${this.employeesSearch}`);
  }

  searchClick() {
    this.router.navigate([`company/${this.searchInput}`]);
  }

  onSearchInput = () => {
    this.newSearch = this.searchInput;
    console.log('searching for input', this.newSearch);
    const foundCompany = this.companiesSearch.find((c: Company) =>
      this.newSearch.toString().includes(c.name)
    );
    if (foundCompany) {
      return this.officeService
        .getOfficees(foundCompany._id)
        .subscribe(() =>
          this.router.navigate([`company/${foundCompany._id}/offices`])
        );
    }

    const foundOffice = this.officesSearch.find((o: Office) => {
      o.countryName.toLowerCase().includes(this.newSearch.toLowerCase()) ||
        o.cityName.toLowerCase().includes(this.newSearch.toLowerCase()) ||
        o.streetName.toLowerCase().includes(this.newSearch.toLowerCase());
    });
    if (foundOffice) {
      return this.officeService
        .getEmployees(foundOffice._companyId, foundOffice._id)
        .subscribe(() =>
          this.router.navigate([
            `company/${foundOffice._companyId}/offices/${foundOffice._id}/employees`,
          ])
        );
    }

    const foundEmployee = this.employeesSearch.find((e: Employee) => {
      this.newSearch.toString().includes(e.firstName) ||
        this.newSearch.toString().includes(e.lastName);
    });
    if (foundEmployee) {
      let companyForE;
      companyForE = this.officesSearch.find(
        (o: Office) => foundEmployee._officeId === o._id
      );
      return this.officeService
        .getEmployeeById(
          companyForE._companyId,
          foundEmployee._officeId,
          foundEmployee._id
        )
        .subscribe((e: Employee) => {
          this.router.navigate([
            `company/${companyForE._companyId}/offices/${e._officeId}/employeesSearch/${e._id}`,
          ]);
        });
    }
  };
}
