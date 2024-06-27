import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
  @ViewChild('imageList') imageList: ElementRef | undefined;
  @ViewChild('scrollbarThumb') scrollbarThumb: ElementRef | undefined;
  @ViewChildren('slide') slides!: QueryList<ElementRef>;

  showPrevButton = false;
  showNextButton = true;
  maxScrollLeft = 0;

  ngAfterViewInit() {
    this.initSlider();
    this.updateButtonsVisibility();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.initSlider();
  }

  initSlider() {
    if (this.imageList) {
      const imageListElement = this.imageList.nativeElement;
      this.maxScrollLeft = imageListElement.scrollWidth - imageListElement.clientWidth;
    }
  }

  scroll(direction: 'prev' | 'next') {
    if (this.imageList) {
      const imageListElement = this.imageList.nativeElement;
      const scrollAmount = imageListElement.clientWidth * (direction === 'prev' ? -1 : 1);
      imageListElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  handleMouseDown(event: MouseEvent) {
    if (this.scrollbarThumb) {
      const thumbElement = this.scrollbarThumb.nativeElement;
      const startX = event.clientX;
      const thumbPosition = thumbElement.offsetLeft;
      const maxThumbPosition = thumbElement.parentElement.clientWidth - thumbElement.offsetWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * this.maxScrollLeft;

        thumbElement.style.left = `${boundedPosition}px`;
        if (this.imageList) {
          this.imageList.nativeElement.scrollLeft = scrollPosition;
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }

  updateButtonsVisibility() {
    if (this.imageList) {
      const imageListElement = this.imageList.nativeElement;
      this.showPrevButton = imageListElement.scrollLeft > 0;
      this.showNextButton = imageListElement.scrollLeft < this.maxScrollLeft;
    }
  }


}

