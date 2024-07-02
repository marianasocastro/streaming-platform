import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { Serie } from '../models/serie.model'

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

  // private loadConfig(): Promise<any> {
  //   return this.http.get('/assets/config.json').pipe(
  //     tap(config => this.config = config)
  //   ).toPromise();
  // }

  private loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
        return config; // Retornando o config para garantir que a promessa seja resolvida corretamente
      })
      .catch((error: any) => {
        console.error('Erro ao carregar configuração:', error);
        throw error; // Lançando o erro para tratamento posterior, se necessário
      });
  }


  getTopRatedSeries(): Observable<Serie[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/tv/top_rated`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            return {
              id: item.id,
              media_type: 'TV',
              title: item.name,
              genre_ids: item.genre_ids,
              genres: item.genre_ids.map((id: number) => this.getGenreName(id, this.genresTV)),
              backdrop_path: item.backdrop_path,
              poster_path: item.poster_path,
              overview: item.overview,
              release_date: item.first_air_date,
              vote_average: item.vote_average
            } as Serie;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }

  getPopularSeries(): Observable<Serie[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/tv/popular`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            return {
              id: item.id,
              media_type: 'TV',
              title: item.name,
              genre_ids: item.genre_ids,
              genres: item.genre_ids.map((id: number) => this.getGenreName(id, this.genresTV)),
              backdrop_path: item.backdrop_path,
              poster_path: item.poster_path,
              overview: item.overview,
              release_date: item.first_air_date,
              vote_average: item.vote_average
            } as Serie;
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
