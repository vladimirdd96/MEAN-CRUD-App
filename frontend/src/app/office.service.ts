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
    return this.webService.get('company')
  }

  createCompany(name: string, creationDate: Date) {
    return this.webService.post('company', { name, creationDate })
  }

  deleteCompany(companyId: string) {
    return this.webService.delete(`company/${companyId}`)
  }

  getOfficees(companyId: string) {
    return this.webService.get(`company/:${companyId}/offices`)
  }

  createOffice(companyId: string, name: string, creationDate: Date) {
    return this.webService.post(`company/${companyId}/offices`, { name, creationDate })
  }

  deleteOffice(companyId: string, officeId: string) {
    return this.webService.delete(`company/${companyId}/offices/${officeId}`)
  }

  ifHeadquarters(companyId: string, office: Office) {
    return this.webService.patch(`company/${companyId}/offices/${office._id}`, { headquarters: !office.headquarters })
  }

  getEmployee(companyId: string, officeId: string) {
    return this.webService.get(`company/${companyId}/offices/${officeId}/employee`)
  }

  createEmployee(
    companyId: string,
    officeId: string,
    firstName: string,
    lastName: string,
    startingDate: Date,
    salary: number,
    vacationDays: number,
    experience: {
      junior: 'junior'
      mid: 'mid'
      senior: 'senior'
    }) {
    return this.webService.post(`company/${companyId}/offices/${officeId}/employees`, { firstName, lastName, startingDate, salary, vacationDays, experience })
  }

  deleteEmployee(companyId: string, officeId: string, employee: Employee) {
    return this.webService.delete(`company/${companyId}/offices/${officeId}/employees/${employee._id}`)
  }

  // relocateEmployee(officeId: string, companyId: string, employee: Employee) {
  //   return this.webService.patch(`company/${companyId}/offices/${officeId}/employees/${employee._id}`, { _officeId:  })
  // }
}
