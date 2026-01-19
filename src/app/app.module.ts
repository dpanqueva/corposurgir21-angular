import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoryComponent } from './components/category/principal/category.component';
import { AlliancesComponent } from './components/alliances/principal/alliances.component';
import { FooterComponent } from './components/footer/principal/footer.component';
import { ContactComponent } from './components/contact/contact.component';

import { CategoryService } from './core/services/category/principal/category.service';

import { ROUTES } from './common/routes.modules';
import { HomeComponent } from './components/home/principal/home.component';
import { AboutService } from './core/services/about.service';

import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { DetailComponent } from './components/alliances/principal/detail/detail.component';
import { ConstructionComponent } from './components/construction/construction.component';
import { CategoryDetailComponent } from './components/category/principal/category-detail/category-detail.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule } from 'ng-recaptcha';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptorService } from './core/services/interceptor/spinnerinterceptor.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryFeaturesComponent } from './components/category/auth/category-features/category-features.component';

import { AboutTableComponent } from './components/about/auth/about-table/about-table.component';
import { AboutComponent } from './components/about/principal/about.component';
import { AboutFormComponent } from './components/about/auth/about-form/about-form.component';
import { CompanyInfoTableComponent } from './components/footer/auth/company-info-table/company-info-table.component';
import { CompanyInfoFormComponent } from './components/footer/auth/company-info-form/company-info-form.component';
import { BackPageComponent } from './components/back-page/back-page.component';
import { CompanyInfoSocialTableComponent } from './components/footer/auth/company-info-social-table/company-info-social-table.component';
import { CompanyInfoSocialFormComponent } from './components/footer/auth/company-info-social-form/company-info-social-form.component';
import { HomeAdminComponent } from './components/home/auth/home-admin.component';
import { CategoryFormComponent } from './components/category/auth/category-form/category-form.component';
import { CategoryTableComponent } from './components/category/auth/category-table/category-table.component';
import { CategoryFeaturesFormComponent } from './components/category/auth/category-features-form/category-features-form.component';
import { AlliancesTableComponent } from './components/alliances/auth/alliances-table/alliances-table.component';
import { AlliancesFormComponent } from './components/alliances/auth/alliances-form/alliances-form.component';
import { AlliancesFeaturesTableComponent } from './components/alliances/auth/alliances-features-table/alliances-features-table.component';
import { AlliancesFeaturesFormComponent } from './components/alliances/auth/alliances-features-form/alliances-features-form.component';
import { DonationComponent } from './components/donation/principal/donation/donation.component';
import { DonationFormComponent } from './components/donation/auth/donation-form/donation-form.component';
import { CommonModule } from '@angular/common';
import { DonationTableComponent } from './components/donation/auth/donation-table/donation-table.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    CategoryComponent,
    AlliancesComponent,
    FooterComponent,
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
    CompanyInfoFormComponent,
    BackPageComponent,
    CompanyInfoSocialTableComponent,
    CompanyInfoSocialFormComponent,
    AlliancesTableComponent,
    AlliancesFormComponent,
    AlliancesFeaturesTableComponent,
    AlliancesFeaturesFormComponent,
    DonationComponent,
    DonationFormComponent,
    DonationTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    NgxPaginationModule,
    RecaptchaModule,
    CommonModule,
    RouterModule

  ],
  providers: [
    CategoryService,
    AboutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
