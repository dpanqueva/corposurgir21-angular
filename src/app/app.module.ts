import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoryComponent } from './components/category/category.component';
import { AlliancesComponent } from './components/alliances/alliances.component';
import { FooterComponent } from './components/footer/footer.component';
import { AffiliationsComponent } from './components/affiliations/affiliations.component';
import { ContactComponent } from './components/contact/contact.component';


import {CategoryService} from './core/services/category.service';

import { ROUTES } from './common/routes.modules';
import { HomeComponent } from './components/home/home.component';
import { AboutService } from './core/services/about.service';
import { AboutComponent } from './components/about/about.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { DetailComponent } from './components/alliances/detail/detail.component';
import { ConstructionComponent } from './components/construction/construction.component';
import { CategoryDetailComponent } from './components/category/category-detail/category-detail.component';

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
    DetailComponent,
    HomeComponent,
    AboutComponent,
    WhatsappComponent,
    ConstructionComponent,
    CategoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [CategoryService, AboutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
