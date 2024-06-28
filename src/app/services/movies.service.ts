import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private config: any;
  companyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  private loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json').pipe(
      tap(config => this.config = config)
    ).toPromise();
  }

  getTrendingMovies(): Observable<any> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get(`${this.config.API_URL}/trending/movie/day`, { params });
      })
    );
  }

  getGenreList(): Observable<any>{
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get(`${this.config.API_URL}/genre/movie/list`, { params });
      })
    );
  }

  getCompanyListById(company_id: number): Observable<any>{
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get(`${this.config.API_URL}/company/${company_id}`, { params });
      })
    );
  }

  getCompaniesListByIds(company_ids: number[]): Observable<any[]> {
    return forkJoin(company_ids.map(id => this.getCompanyListById(id)));
  }

}
