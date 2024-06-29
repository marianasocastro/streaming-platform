import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
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

  trendingMovies!: any[];
  upcomingMovies!: any[];
  popularWeek!: any[];
  popularDay!: any[];
  genres!: any[];
  companies!: any[];
  topRatedMovies!: any[];
  popularSeries!: any[];
  topRatedSeries!: any[];

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
      (data) => {
        this.popularWeek = data
      },
      (error) => {
        console.error('Error finding trending of the week:', error);
      }
    )

    this.trendingService.get5TrendingDay().subscribe(
      (data) => {
        this.popularDay = data;
      },
      (error) => {
        console.error('Error finding trending of the day:', error);
      }
    )

    this.moviesService.getNowPlayingMovies().subscribe(
      (data) => {
        this.upcomingMovies = data;
      },
      (error) => {
        console.error('Error finding Playing Now movies:', error);
      }
    )

    this.moviesService.getTopRatedMovies().subscribe(
      (data) => {
        this.topRatedMovies = data;
        console.log(data)
      },
      (error) => {
        console.error('Error finding popular movies:', error);
      }
    )

    this.tvSeriesService.getPopularSeries().subscribe(
      (data) => {
        this.popularSeries = data
      },
      (error) => {
        console.error('Error finding popular series:', error);
      }
    )

    this.tvSeriesService.getTopRatedSeries().subscribe(
      (data) => {
        this.topRatedSeries = data
      },
      (error) => {
        console.error('Error finding top rated series:', error);
      }
    )




  }


}
