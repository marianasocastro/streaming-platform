import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private config: any;
  companyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  companies!: any[];

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  private loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json').pipe(
      tap(config => this.config = config)
    ).toPromise();
  }

  getCompanyListById(company_id: number): Observable<any>{
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get(`${this.config.API_URL}/company/${company_id}`, { params });
      })
    );
  }

  getCompaniesListByIds(): Observable<any[]> {
    return forkJoin(this.companyIds.map(id => this.getCompanyListById(id)));
  }

}
