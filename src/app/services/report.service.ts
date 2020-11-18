import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retryWhen, finalize, mergeMap, catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { Observable, of, throwError, timer } from 'rxjs';

export const genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [200,500,400]
  }: {
    maxRetryAttempts?: number,
    scalingDuration?: number,
    excludedStatusCodes?: number[]
  } = {}) => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (
          retryAttempt > maxRetryAttempts ||
          excludedStatusCodes.find(e => e === error.status)
        ) {
          return throwError(error);
        };
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => {})
    );
  };

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(
        private http: HttpClient
    ) {}

    getReport(data: object) {
      console.log(data);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        const options = { headers: headers };
        console.log(environment.apiUrl + environment.path_report)
        return this.http.post<any>(
            environment.apiUrl + environment.path_report, data, options
        ).pipe(map(report => {
            return report;
        }));
    }

    checkReport(downloadURL: string): Observable<string> {
      console.log(downloadURL);
      return this.http.get<any>(downloadURL)
      .pipe(
          map(report => {
              return report;
          }),
          retryWhen(genericRetryStrategy()),
          catchError(error => of(error))
      );
    }
}
