import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  private config: any;
  genresMovies!: any[];
  genresTV!: any[];

  constructor(private http: HttpClient) {
    this.loadConfig();
    this.getMovieGenreList().subscribe(
      (data) => {
        this.genresMovies = data;
      },
      (error) => {
        console.error('Erro ao buscar gêneros de filmes:', error);
      }
    )

    this.getTVSeriesGenreList().subscribe(
      (data) => {
        this.genresTV = data;
      },
      (error) => {
        console.error('Erro ao buscar gêneros de séries:', error);
      }
    )

  }

  private loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json').pipe(
      tap(config => this.config = config)
    );
  }


  getTrendingDay(): Observable<any[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/trending/all/day`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            if (item.media_type === 'movie') {
              item.genres = item.genre_ids.map((id: number) => this.getGenreName(id, this.genresMovies));
            } else if (item.media_type === 'tv') {
              item.genres = item.genre_ids.map((id: number) => this.getGenreName(id, this.genresTV));
            }
            return item;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }


  getTrendingWeek(): Observable<any[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/trending/all/week`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            if (item.media_type === 'movie') {
              item.genres = item.genre_ids.map((id: number) => this.getGenreName(id, this.genresMovies));
            } else if (item.media_type === 'tv') {
              item.genres = item.genre_ids.map((id: number) => this.getGenreName(id, this.genresTV));
            }
            return item;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }

  getMovieGenreList(): Observable<any>{
    return this.http.get(`../../assets/genresMovies.json`);
  }

  getTVSeriesGenreList(): Observable<any>{
    return this.http.get(`../../assets/genresTV.json`);
  }

  // Método para obter o nome do gênero a partir do id
  getGenreName(id: number, genres: any[]): string {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  }

  get5TrendingDay(): Observable<any[]>{
    return this.getTrendingDay().pipe(
      map(trending => trending.slice(0, 5))
    );
  }

  get10TrendingWeek(): Observable<any[]> {
    return this.getTrendingWeek().pipe(
      map(trending => trending.slice(0, 10))
    );
  }
}
