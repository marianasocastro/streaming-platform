import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  slides = [
    {
      image: 'assets/Treinamento.png',
      title: 'Star Wars: The Force Awaken',
      description: ' Description for Slide 1 Description for Slide 1 Description for Slide 1 Description for Slide 1 Description for Slide 1'
    },
    {
      image: 'assets/Deteccao_de_raio_x.png',
      title: 'Slide 2',
      description: 'Description for Slide 2'
    },
    {
      image: 'assets/Chat_atendimento.png',
      title: 'Slide 3',
      description: 'Description for Slide 3'
    }
  ];

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
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

}
