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
  _officeId: string;
}
