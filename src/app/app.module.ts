import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { StudioCarouselComponent } from './components/studio-carousel/studio-carousel.component';
import { VerticalCardComponent } from './components/vertical-card/vertical-card.component';
import { HorizontalCardComponent } from './components/horizontal-card/horizontal-card.component';
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { SliderComponent } from './components/slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    StudioCarouselComponent,
    VerticalCardComponent,
    HorizontalCardComponent,
    MiniCardComponent,
    SliderComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
