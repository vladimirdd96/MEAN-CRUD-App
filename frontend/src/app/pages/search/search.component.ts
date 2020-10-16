import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import Company from 'src/app/models/company';
import Employee from 'src/app/models/employee';
import Office from 'src/app/models/office';
import { OfficeService } from 'src/app/office.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    companiesSearch: Company[] = [];
    officesSearch: Office[] = [];
    employeesSearch: Employee[] = [];

    searchInput = ''
    newSearch = 'No Content'

    constructor(
        private officeService: OfficeService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.officeService.getCompaniesSearch().subscribe((companiesSearch: Company[]) => this.companiesSearch = companiesSearch);
        console.log(`companiesSearch: ${this.companiesSearch}`);
        this.officeService.getOfficeesSearch().subscribe((officesSearch: Office[]) => this.officesSearch = officesSearch)
        console.log(`officesSearch: ${this.officesSearch}`);
        this.officeService.getEmployeesSearch().subscribe((employeesSearch: Employee[]) => this.employeesSearch = employeesSearch)
        console.log(`employeesSearch: ${this.employeesSearch}`);
    }

    searchClick() {
        this.router.navigate([`company/${this.searchInput}`])
    }

    onSearchInput = () => {
        const search = () => {
            this.newSearch = this.searchInput
            console.log('searching for input', this.newSearch);
            this.companiesSearch.filter((c: Company) =>{
                if(c.name === this.newSearch) {
                    return this.officeService.getCompanyById(c._id).subscribe((c: Company) => this.router.navigate([`company/${c._id}`]))
                }
            })
            this.officesSearch.filter((office: Office)=> {
                if(office.countryName === this.newSearch || office.cityName === this.newSearch || office.streetName === this.newSearch){
                    return this.officeService.getOfficeeById(office._companyId, office._id).subscribe((o: Office) => this.router.navigate([`company/${o._companyId}/offices/${o._id}`]))
                }

            })
            this.employeesSearch.filter((e: Employee) => {
                if( e.firstName === this.newSearch || e.lastName === this.newSearch) {
                    let companyForE
                    companyForE = this.officesSearch.filter((o: Office) => o._id === e._officeId)
                    return this.officeService.getEmployeeById(companyForE._companyId, e._officeId, e._id).subscribe((e: Employee) => this.router.navigate([`company/${companyForE._companyId}/offices/${e._officeId}/employeesSearch/${e._id}`]))
                }
            })
        }
        setTimeout(search, 2000)
    }
}
