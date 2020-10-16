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
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.officeId = params.officeId
      this.companyId = params.companyId
    })
  }
  addOffice(countryName: string, cityName: string, streetName: string, streetNumber: number, headquarters: boolean) {
    this.officeService.createOffice(countryName, cityName, streetName, streetNumber, headquarters, this.companyId)
      .subscribe((o: Office) => this.router.navigate([`./company/${this.companyId}/offices/${o._id}/employees`]))
  }

  cancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
