import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Office from 'src/app/models/office';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.scss']
})
export class NewOfficeComponent implements OnInit {

  companyId: string;
  officeId: string

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId
      this.companyId = params.companyId
    })
  }

  ngOnInit(): void {
  }
  addOffice(countryName: string, cityName: string, streetName: string, streetNumber: number, ifHeadquarters: boolean) {
    this.officeService.createOffice(countryName, cityName, streetName, streetNumber, ifHeadquarters, this.companyId)
      .subscribe((office: Office) => this.router.navigate([`../${office._id}/employees`], { relativeTo: this.route }))
  }

  canselClick() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
