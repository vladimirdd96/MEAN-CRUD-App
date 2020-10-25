export default class Employee {
  _id: string;
  firstName: string;
  lastName: string;
  startingDate: Date;
  salary: number;
  vacationDays: number;
  experience: {
    junior: 'junior';
    mid: 'mid';
    senior: 'senior';
  };
  _officeId: {
    _id: string;
    countryName: string;
    cityName: string;
    streetName: string;
    streetNumber: string;
    headquarters: boolean;
    _companyId: string;
    _employeesId: string[];
  };
}
