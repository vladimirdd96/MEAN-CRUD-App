import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Gallery } from './models/gallery';
import { ActivatedRoute, Params } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  employeeId: string
  apiUrl = 'http://localhost:3000/';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { this.route.params.subscribe((params: Params) => this.employeeId = params.employeeId) }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getGalleryById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Gallery>(url).pipe(catchError(this.handleError));
  }

  addGallery(companyId: string, officeId: string, employeeId: string, gallery: Gallery, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', gallery.imageTitle);
    formData.append('imageDesc', gallery.imageDesc);
    formData.append('_employeeId', this.employeeId);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    this.apiUrl += `company/${companyId}/offices/${officeId}/employees/${this.employeeId}/add-photo`
    const req = new HttpRequest('POST', this.apiUrl, formData, options);
    return this.http.request(req);
  }
}
