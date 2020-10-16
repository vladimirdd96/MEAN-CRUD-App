import { Injectable } from '@angular/core';
import Office from './models/office';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private webService: WebService) { }

//search
// getCompaniesSearch() {
//   return this.webService.get('')
// }

// getOfficeesSearch() {
//   return this.webService.get(`offices`)
// }

// getEmployeesSearch() {
//   return this.webService.get(`employees`)
// }


  // getCompanyById(companyId: string) {
  //   return this.webService.get(`company/${companyId}/offices`)
  // }

  getCompanies() {
    return this.webService.get('company')
  }

  createCompany(name: string, creationDate: Date) {
    if (!name || !creationDate) {
      alert('All fields are required!')
      return
    }
    return this.webService.post('company', { name, creationDate })
  }

  deleteCompany(companyId: string) {
    return this.webService.delete(`company/${companyId}`)
  }

  // getOfficeeById(companyId: string, officeId: string) {
  //   return this.webService.get(`company/${companyId}/offices/${officeId}/employees`)
  // }

  getOfficees(companyId: string) {
    return this.webService.get(`company/${companyId}/offices`)
  }

  createOffice(
    countryName: string,
    cityName: string,
    streetName: string,
    streetNumber: number,
    headquarters: boolean,
    _companyId: string
  ) {
    if (!countryName || !cityName || !streetName || !streetNumber) {
      alert('All fields are required!')
      return
    }
    return this.webService.post(`company/${_companyId}/offices`, { countryName, cityName, streetName, streetNumber, headquarters, _companyId });
  }

  deleteOffice(companyId: string, officeId: string) {
    return this.webService.delete(`company/${companyId}/offices/${officeId}/employees`)
  }

  headquarters(companyId: string, office: Office) {
    console.log('in headquarters FrontEnd')
    return this.webService.patch(`company/${companyId}/offices/${office._id}/employees`, { headquarters: !office.headquarters })
  }

  // getEmployeeById(companyId: string, officeId: string, employeeId: string) {
  //   return this.webService.get(`company/${companyId}/offices/${officeId}/employees/${employeeId}`)
  // }

  getEmployees(companyId: string, officeId: string) {
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
    if (!firstName || !lastName || !startingDate || !salary || !vacationDays || !experience) {
      alert('All fields are required!')
      return
    }
    return this.webService.post(`company/${_companyId}/offices/${_officeId}/employees`, { firstName, lastName, startingDate, salary, vacationDays, experience, _officeId })
  }

  deleteEmployee(companyId: string, officeId: string, employeeId: string) {
    return this.webService.delete(`company/${companyId}/offices/${officeId}/employees/${employeeId}`)
  }

  relocateEmployee(companyId: string, officeId: string, employeeId: string, desiredOfficeId: string) {
    return this.webService.patch(`company/${companyId}/offices/${officeId}/employees/${employeeId}`, { _officeId: desiredOfficeId })
  }

  search(searchInput: string) {
    return this.webService.get(`company/${searchInput}`)
  }
}
