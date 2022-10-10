import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoryComponent } from './components/category/category.component';
import { AlliancesComponent } from './components/alliances/alliances.component';
import { FooterComponent } from './components/footer/footer.component';
import { AffiliationsComponent } from './components/affiliations/affiliations.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/category/detail/detail.component';

import {CategoryService} from './core/services/category.service';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    CategoryComponent,
    AlliancesComponent,
    FooterComponent,
    AffiliationsComponent,
    ContactComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
