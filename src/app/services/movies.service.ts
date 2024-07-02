import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model'

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private config: any;
  genresMovies!: any[];

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
  }



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


  getTrendingMovies(): Observable<Movie[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/trending/movie/day`, { params });
      }),
      map(data => {
        return data.results.map((item: any) => {
          return {
            id: item.id,
            media_type: 'Movie',
            title: item.title,
            genre_ids: item.genre_ids,
            genres: item.genres || [], // Certifique-se de que os gêneros estejam presentes
            backdrop_path: item.backdrop_path,
            poster_path: item.poster_path,
            overview: item.overview,
            release_date: item.release_date,
            vote_average: item.vote_average
          } as Movie;
        });
      })
    );
  }


  getNowPlayingMovies(): Observable<Movie[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/movie/now_playing`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            return {
              id: item.id,
              media_type: 'Movie',
              title: item.title,
              genre_ids: item.genre_ids,
              genres: item.genre_ids.map((id: number) => this.getGenreName(id, this.genresMovies)),
              backdrop_path: item.backdrop_path,
              poster_path: item.poster_path,
              overview: item.overview,
              release_date: item.release_date,
              vote_average: item.vote_average
            } as Movie;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }

  getTopRatedMovies(): Observable<Movie[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams().set('api_key', this.config.API_KEY);
        return this.http.get<any>(`${this.config.API_URL}/movie/top_rated`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            return {
              id: item.id,
              media_type: 'Movie',
              title: item.title,
              genre_ids: item.genre_ids,
              genres: item.genre_ids.map((id: number) => this.getGenreName(id, this.genresMovies)),
              backdrop_path: item.backdrop_path,
              poster_path: item.poster_path,
              overview: item.overview,
              release_date: item.release_date,
              vote_average: item.vote_average
            } as Movie;
          });
        } else {
          throw new Error('Dados inválidos ou ausentes da API');
        }
      })
    );
  }

  getMoviesByGenre(genreID: number): Observable<Movie[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => {
        let params = new HttpParams()
          .set('api_key', this.config.API_KEY)
          .set('with_genres', genreID.toString());
        return this.http.get<any>(`${this.config.API_URL}/discover/movie`, { params });
      }),
      map(data => {
        if (data && data.results && data.results.length > 0) {
          return data.results.map((item: any) => {
            return {
              id: item.id,
              media_type: 'Movie',
              title: item.title,
              genre_ids: item.genre_ids,
              genres: item.genre_ids.map((id: number) => this.getGenreName(id, this.genresMovies)),
              backdrop_path: item.backdrop_path,
              poster_path: item.poster_path,
              overview: item.overview,
              release_date: item.release_date,
              vote_average: item.vote_average
            } as Movie;
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

  // Método para obter o nome do gênero a partir do id
  getGenreName(id: number, genres: any[]): string {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  }

}
