import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvSeriesService {

  private config: any;
  genresTV!: any[];

  constructor(private http: HttpClient) {
    this.loadConfig();
    this.getTVSeriesGenreList().subscribe(
      (data) => {
        this.genresTV = data;
      },
      (error) => {
        console.error('Erro ao buscar gêneros de filmes:', error);
      }
    )
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


  getTopRatedSeries(): Observable<any[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/tv/top_rated`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            item.genres = item.genre_ids.map((id: number) => this.getGenreName(id, this.genresTV));
            return item;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }

  getPopularSeries(): Observable<any[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/tv/popular`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            item.genres = item.genre_ids.map((id: number) => this.getGenreName(id, this.genresTV));
            return item;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }

  getTVSeriesGenreList(): Observable<any>{
    return this.http.get(`../../assets/genresTV.json`);
  }

  // Método para obter o nome do gênero a partir do id
  getGenreName(id: number, genres: any[]): string {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  }
}
