import { TvSeriesService } from './../../services/tv-series.service';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genrer-banner',
  templateUrl: './genrer-banner.component.html',
  styleUrls: ['./genrer-banner.component.scss']
})
export class GenrerBannerComponent implements OnInit {
  moviesWithSelectedGenre!: any;
  seriesWithSelectedGenre!: any;
  selectedGenre!: any;
  moviesGenres!: any;
  tvSeriesGenres!: any;
  currentIndex = 0;

  constructor(private moviesService: MoviesService, private tvSeriesService:TvSeriesService ) { }

  ngOnInit(): void {
    this.startAutoSlide();

    this.moviesService.getMovieGenreList().subscribe(
      (data) => {
        this.moviesGenres = data;
        console.log(data)
      },
      (error) => {
        console.error('Error finding popular movies:', error);
      }
    )
  }

  startAutoSlide(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.media.length - 1) ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

}
