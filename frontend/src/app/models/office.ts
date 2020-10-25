export default class Office {
  _id: string;
  countryName: string;
  cityName: string;
  streetName: string;
  streetNumber: string;
  headquarters: boolean;
  _companyId: {
    _id: string;
    name: string;
    creationDate: Date;
    _officesId: string
  }
  _employeesId: string[];
}
