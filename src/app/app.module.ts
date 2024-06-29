import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MoviesService } from './services/movies.service';
import { CompaniesService } from './services/companies.service';
import { TrendingService } from './services/trending.service';


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
    BannerComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MoviesService,
    CompaniesService,
    TrendingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
