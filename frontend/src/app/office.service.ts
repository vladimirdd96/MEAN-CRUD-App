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
    console.log('getting company FrontEnd');
    return this.webService.get('company')
  }

  createCompany(name: string, creationDate: Date) {
    console.log('creating company FrontEnd');
    if (!name || !creationDate) {
      alert('All fields are required!')
      return
    }
    return this.webService.post('company', { name, creationDate })
  }

  deleteCompany(companyId: string) {
    console.log('deleting company FrontEnd');
    return this.webService.delete(`company/${companyId}`)
  }

  getOfficees(companyId: string) {
    console.log('geting offices FrontEnd');
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
    console.log('creating office FrontEnd');
    return this.webService.post(`company/${_companyId}/offices`, { countryName, cityName, streetName, streetNumber, headquarters, _companyId });
  }

  deleteOffice(companyId: string, officeId: string) {
    console.log('deleting office FrontEnd');
    return this.webService.delete(`company/${companyId}/offices/${officeId}`)
  }

  headquarters(companyId: string, offices: Office[], office: Office) {
    if (!offices.filter(o => {
      o._id === office._id &&
        o.headquarters === true ||
        offices.filter((o: Office) => o.headquarters === true).length
    }).length) {
      alert('Headquarter already Active ');
      return
    }
    console.log('headquarters changed FrontEnd')

    this.webService.patch(`company/${companyId}/offices/${office._id}`, {})
    return this.webService.patch(`company/${companyId}/offices/${office._id}`, { headquarters: !office.headquarters })

  }


  getEmployees(companyId: string, officeId: string) {
    console.log('getting employees FrontEnd');
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
    console.log('creating employee FrontEnd');
    return this.webService.post(`company/${_companyId}/offices/${_officeId}/employees`, { firstName, lastName, startingDate, salary, vacationDays, experience, _officeId })
  }

  deleteEmployee(companyId: string, officeId: string, employeeId: string) {
    console.log('deleting employee FrontEnd');
    return this.webService.delete(`company/${companyId}/offices/${officeId}/employees/${employeeId}`)
  }



  relocateEmployee(companyId: string, officeId: string, employeeId: string, desiredOfficeId: string) {
    console.log('relocating employees FrontEnd');
    return this.webService.patch(`company/${companyId}/offices/${officeId}/employees/${employeeId}`, { _officeId: desiredOfficeId })
  }
}
