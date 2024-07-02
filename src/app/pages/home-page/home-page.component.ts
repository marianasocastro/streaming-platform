import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { Serie } from 'src/app/models/serie.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TrendingService } from 'src/app/services/trending.service';
import { TvSeriesService } from 'src/app/services/tv-series.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  trendingMovies!: Movie[];
  upcomingMovies!: Movie[];
  popularWeek!: (Movie | Serie)[];
  popularDay!: (Movie | Serie)[];
  companies!: any[];
  topRatedMovies!: Movie[];
  popularSeries!: Serie[];
  topRatedSeries!: Serie[];

  constructor(
    private moviesService: MoviesService,
    private companiesService: CompaniesService,
    private trendingService: TrendingService,
    private tvSeriesService: TvSeriesService) { }

  ngOnInit(): void {

    this.companiesService.getCompaniesListByIds().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error finding comapnies:', error);
      }
    )

    this.trendingService.get10TrendingWeek().subscribe(
      (medias: (Movie | Serie)[]) => {
        this.popularWeek = medias
      },
      (error) => {
        console.error('Error finding trending of the week:', error);
      }
    )

    this.trendingService.get5TrendingDay().subscribe(
      (medias: (Movie | Serie)[]) => {
        this.popularDay = medias;
      },
      (error) => {
        console.error('Error finding trending of the day:', error);
      }
    )

    this.moviesService.getNowPlayingMovies().subscribe(
      (movies: Movie[]) => {
        this.upcomingMovies = movies;
      },
      (error) => {
        console.error('Error finding Playing Now movies:', error);
      }
    )

    this.moviesService.getTopRatedMovies().subscribe(
      (movies: Movie[]) => {
        this.topRatedMovies = movies;
        console.log(movies)
      },
      (error) => {
        console.error('Error finding popular movies:', error);
      }
    )

    this.tvSeriesService.getPopularSeries().subscribe(
      (series: Serie[]) => {
        this.popularSeries = series
      },
      (error) => {
        console.error('Error finding popular series:', error);
      }
    )

    this.tvSeriesService.getTopRatedSeries().subscribe(
      (series: Serie[]) => {
        this.topRatedSeries = series
      },
      (error) => {
        console.error('Error finding top rated series:', error);
      }
    )

  }

}
