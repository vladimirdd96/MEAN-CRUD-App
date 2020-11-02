// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import Company from 'src/app/models/company';
// import Employee from 'src/app/models/employee';
// import { Gallery } from 'src/app/models/gallery';
// import Office from 'src/app/models/office';
// import { OfficeService } from 'src/app/office.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {

//   employeeId: string

//   employeeSearch: Employee[] = [];
//   galeries: Gallery[] = []

//   employeeFirstNameInput: string
//   employeeLastNameInput: string
//   employeeStaringDateInput: Date
//   employeeSalaryInput: number
//   employeeVacationDaysInput: number
//   employeeExperienceInput: {
//     junior: 'junior',
//     mid: 'mid',
//     senior: 'senior'
//   }
  

//   constructor(
//     private officeService: OfficeService,
//     private route: ActivatedRoute,
//     private router: Router,) { }

//   ngOnInit(): void {
//     this.route.params.subscribe((params: Params) => {
//       this.employeeId = params.employeeId;
      
//     }
//     // this.officeService
//     //   .getEmployeesSearch()
//     //   .subscribe((e: Employee[]) => (this.employeeSearch = e));

//   }

//   backClick() {
//     this.router.navigate(['../../'], {relativeTo: this.route})
//   }

//   editEmployee() {
//     // this.officeService.updateEmployee()
//   }

// }
