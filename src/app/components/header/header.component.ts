import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() trending: any[] = [];

  currentIndex = 0;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.trending.length - 1) ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

}
