import { Injectable } from '@angular/core';
import Company from './models/company';
import Employee from './models/employee';
import Office from './models/office';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private webService: WebService) { }

  getCompanies() {
    console.log('getting company');
    return this.webService.get('company')
  }

  createCompany(name: string, creationDate: Date) {
    console.log('creating company');
    return this.webService.post('company', { name, creationDate })
  }

  deleteCompany(companyId: string) {
    console.log('deleting company');
    return this.webService.delete(`company/${companyId}`)
  }

  getOfficees(companyId: string) {
    console.log('geting offices');
    return this.webService.get(`company/:${companyId}/offices`)
  }

  createOffice(
    countryName: string,
    cityName: string,
    streetName: string,
    streetNumber: number,
    headquarters: boolean,
    _companyId: string
  ) {
    console.log('creating office');
    return this.webService.post(`company/${_companyId}/offices`, { countryName, cityName, streetName, streetNumber, headquarters, _companyId });
  }

  deleteOffice(companyId: string, officeId: string) {
    console.log('deleting office');
    return this.webService.delete(`company/${companyId}/offices/${officeId}`)
  }

  ifHeadquarters(companyId: string, office: Office) {
    console.log(`ifHeadquarters ${office.streetName}, ${office.cityName}`);
    return this.webService.patch(`company/${companyId}/offices/${office._id}`, { headquarters: !office.headquarters })
  }

  getEmployees(companyId: string, officeId: string) {
    console.log('getting employees');
    return this.webService.get(`company/${companyId}/offices/${officeId}/employees`)
  }

  createEmployee(
    firstName: string,
    lastName: string,
    startingDate: Date,
    salary: number,
    vacationDays: number,
    experience: {
      junior: 'junior'
      mid: 'mid'
      senior: 'senior'
    },
    _companyId: string,
    _officeId: string
  ) {
    return this.webService.post(`company/${_companyId}/offices/${_officeId}/employees`, { firstName, lastName, startingDate, salary, vacationDays, experience, _officeId })
  }

  deleteEmployee(companyId: string, officeId: string, employeeId: string) {
    return this.webService.delete(`company/${companyId}/offices/${officeId}/employees/${employeeId}`)
  }



  relocateEmployee(companyId: string, officeId: string, employeeId: string, officeCity: string, officeStreet: string) {
    let offices: Office[]

    return this.webService.patch(`company/${companyId}/offices/${officeId}/employees/${employeeId}`, { _officeId: offices.filter((o) => o.cityName === officeCity && o.streetName === officeStreet) })
  }
}
