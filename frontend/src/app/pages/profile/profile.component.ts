import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Employee from 'src/app/models/employee';
import { Gallery } from 'src/app/models/gallery';
import { OfficeService } from 'src/app/office.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    companyId: string;
    officeId: string;
    employeeId: string;
    experience = ['junior', 'mid', 'senior']

    employee: Employee;
    galeries: Gallery[] = [];

    employeeFirstNameInput: string;
    employeeLastNameInput: string;
    employeeStaringDateInput: Date;
    employeeSalaryInput: number;
    employeeVacationDaysInput: number;
    employeeExperienceInput: {
        junior: 'junior',
        mid: 'mid',
        senior: 'senior'
    }

    constructor(
        private officeService: OfficeService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.companyId = params.companyId;
            this.officeId = params.officeId;
            this.employeeId = params.employeeId;
        });

        this.officeService
            .getEmployeeById(this.companyId, this.officeId, this.employeeId)
            .subscribe((e: Employee) => {
                this.employee = e;
                console.log('in');
                this.employeeFirstNameInput = this.employee.firstName;
                this.employeeLastNameInput = this.employee.lastName;
                this.employeeStaringDateInput = this.employee.startingDate;
                this.employeeSalaryInput = this.employee.salary;
                this.employeeVacationDaysInput = this.employee.vacationDays;
                this.employeeExperienceInput = this.employee.experience;
            });
    }

    backClick() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    editEmployee() {
        this.officeService
            .updateEmployee(
                this.employeeFirstNameInput,
                this.employeeLastNameInput,
                this.employeeStaringDateInput,
                this.employeeSalaryInput,
                this.employeeVacationDaysInput,
                this.employeeExperienceInput,
                this.companyId,
                this.officeId,
                this.employeeId
            )
            .subscribe((e: Employee) =>
                this.router.navigate([
                    `/company/${this.companyId}/offices/${e._officeId}/employees`,
                ])
            );
        this.router.navigate([
            `/company/${this.companyId}/offices/${this.officeId}/employees`,
        ]);
    }
}
