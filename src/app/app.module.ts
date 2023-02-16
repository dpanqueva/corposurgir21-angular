import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoryComponent } from './components/category/category.component';
import { AlliancesComponent } from './components/alliances/alliances.component';
import { FooterComponent } from './components/footer/principal/footer.component';
import { AffiliationsComponent } from './components/affiliations/affiliations.component';
import { ContactComponent } from './components/contact/contact.component';


import { CategoryService } from './core/services/category/principal/category.service'; 

import { ROUTES } from './common/routes.modules';
import { HomeComponent } from './components/home/home.component';
import { AboutService } from './core/services/about.service';

import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { DetailComponent } from './components/alliances/detail/detail.component';
import { ConstructionComponent } from './components/construction/construction.component';
import { CategoryDetailComponent } from './components/category/category-detail/category-detail.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptorService } from './core/services/interceptor/spinnerinterceptor.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './components/auth/home/home-admin/home-admin.component';
import { CategoryFormComponent } from './components/auth/category/category-form/category-form.component';
import { CategoryTableComponent } from './components/auth/category/category-table/category-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryFeaturesComponent } from './components/auth/category/category-features/category-features.component';
import { CategoryFeaturesFormComponent } from './components/auth/category/category-features-form/category-features-form.component';
import { AboutTableComponent } from './components/about/auth/about-table/about-table.component';
import { AboutComponent } from './components/about/principal/about.component';
import { AboutFormComponent } from './components/about/auth/about-form/about-form.component';
import { CompanyInfoTableComponent } from './components/footer/auth/company-info-table/company-info-table.component';
import { CompanyInfoFormComponent } from './components/footer/auth/company-info-form/company-info-form.component';




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
    LoginComponent,
    HomeAdminComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    CategoryFeaturesComponent,
    CategoryFeaturesFormComponent,
    AboutTableComponent,
    AboutFormComponent,
    CompanyInfoTableComponent,
    CompanyInfoFormComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [CategoryService, AboutService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
