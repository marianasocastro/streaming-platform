import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  trendingMovies!: any[];
  genres!: any[];
  companies!: any[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {

    const companyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    this.moviesService.getCompaniesListByIds(companyIds).subscribe(
      (data) => {
        this.companies = data;
        console.log(this.companies);
      },
      (error) => {
        console.error('Erro ao buscar as empresas:', error);
      }
    );

    this.moviesService.getGenreList()
      .pipe(
        switchMap((genreData) => {
          // Popula a lista de gêneros
          this.genres = genreData.genres;
          // Faz a requisição dos filmes em tendência
          return this.moviesService.getTrendingMovies();
        })
      )
      .subscribe(
        (data) => {
          // Verifica se a propriedade 'results' existe e contém dados
          if (data && data.results && data.results.length > 0) {
            // Atribui os primeiros 5 resultados à variável trendingMovies
            this.trendingMovies = data.results.slice(0, 5).map((movie: { genres: any; genre_ids: any[]; }) => {
              movie.genres = movie.genre_ids.map(id => this.getGenreName(id));
              return movie;
            });
            console.log(this.trendingMovies);
          } else {
            console.error('Dados inválidos ou ausentes da API');
          }
        },
        (error) => {
          console.error('Erro ao buscar filmes em tendência:', error);
        }
      );
  }
    // Método para obter o nome do gênero a partir do id
  getGenreName(id: number): string {
    const genre = this.genres.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  }

}
