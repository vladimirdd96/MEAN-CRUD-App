import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Office from 'src/app/models/office';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.scss'],
})
export class NewOfficeComponent implements OnInit {
  companyId: string;
  officeId: string;

  countryNameInput: string
  cityNameInput: string
  streetNameInput: string
  streetNumberInput: number
  ifHeadquartersInput: boolean

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId;
      this.companyId = params.companyId;
    });
  }
  addOffice() {
    this.officeService
      .createOffice(
        this.countryNameInput,
        this.cityNameInput,
        this.streetNameInput,
        this.streetNumberInput,
        this.ifHeadquartersInput,
        this.companyId
      )
      .subscribe((o: Office) =>
        this.router.navigate([
          `./company/${this.companyId}/offices/${o._id}/employees`,
        ])
      );
  }

  cancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
