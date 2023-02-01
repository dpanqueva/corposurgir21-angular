import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptorService } from './core/services/interceptor/spinnerinterceptor.service';

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
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule

    ,BrowserAnimationsModule
    ,NgxSpinnerModule
  ],
  providers: [CategoryService, AboutService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
