import { TvSeriesService } from './../../services/tv-series.service';
import { MoviesService } from './../../services/movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-genrer-banner',
  templateUrl: './genrer-banner.component.html',
  styleUrls: ['./genrer-banner.component.scss']
})
export class GenrerBannerComponent implements OnInit {
  // moviesWithSelectedGenre!: any;
  // seriesWithSelectedGenre!: any;
  // selectedGenre!: any;
  @Input() moviesGenres!: any;
  // tvSeriesGenres!: any;
  currentIndex = 0;
  @Input() media!: any[];

  constructor(private moviesService: MoviesService, private tvSeriesService:TvSeriesService ) { }

  ngOnInit(): void {
    this.startAutoSlide();
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
