import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-studio-carousel',
  templateUrl: './studio-carousel.component.html',
  styleUrls: ['./studio-carousel.component.scss']
})
export class StudioCarouselComponent {

  @Input() company: any;

}
