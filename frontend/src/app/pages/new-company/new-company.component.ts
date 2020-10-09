import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Company from 'src/app/models/company';
import { OfficeService } from 'src/app/office.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {
  companyId: string;
  officeId: string

  constructor(
    private officeService: OfficeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // this.route.params.subscribe((params: Params) => {
    //   this.officeId = params.officeId
    //   this.companyId = params.companyId
    // })
  }

  ngOnInit(): void {
  }

  addCompany(name: string, creationDate: Date) {
    this.officeService.createCompany(name, creationDate)
      .subscribe(() => this.router.navigate([`../`]))

  }

  canselClick() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
