import { Component, OnInit } from '@angular/core';
import Company from "../../models/company"
import Employee from '../../models/employee';
import Office from '../../models/office';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss']
})
export class OfficeViewComponent implements OnInit {

  companies: Company[] = [];
  offices: Office[] = [];
  employees: Employee[] = [];
  company: { _id: string }

  constructor() { }

  ngOnInit(): void {
  }

  getEmployees() { }

  deleteOffice() { }

  addOfficeClick() { }

  deleteCompany() { }
}
