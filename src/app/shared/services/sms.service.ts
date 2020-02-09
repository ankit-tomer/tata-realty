import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendSms(body: any) {
    //console.log(body);
    return this.http.post(`${this.apiUrl}/send-sms`, { data: body })
      .pipe(map((res) => {
        return res;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
