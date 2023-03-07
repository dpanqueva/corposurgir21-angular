import { Routes } from "@angular/router";
import { AboutFormComponent } from "../components/about/auth/about-form/about-form.component";
import { AboutTableComponent } from "../components/about/auth/about-table/about-table.component";
import { AboutComponent } from "../components/about/principal/about.component";
import { AlliancesFeaturesFormComponent } from "../components/alliances/auth/alliances-features-form/alliances-features-form.component";
import { AlliancesFeaturesTableComponent } from "../components/alliances/auth/alliances-features-table/alliances-features-table.component";
import { AlliancesFormComponent } from "../components/alliances/auth/alliances-form/alliances-form.component";
import { AlliancesTableComponent } from "../components/alliances/auth/alliances-table/alliances-table.component";
import { DetailComponent } from "../components/alliances/principal/detail/detail.component";
import { CategoryFeaturesFormComponent } from "../components/category/auth/category-features-form/category-features-form.component";

import { CategoryFeaturesComponent } from "../components/category/auth/category-features/category-features.component";
import { CategoryFormComponent } from "../components/category/auth/category-form/category-form.component";
import { CategoryTableComponent } from "../components/category/auth/category-table/category-table.component";


import { CategoryDetailComponent } from "../components/category/principal/category-detail/category-detail.component";

import { ContactComponent } from "../components/contact/contact.component";
import { DonationFormComponent } from "../components/donation/auth/donation-form/donation-form.component";
import { DonationTableComponent } from "../components/donation/auth/donation-table/donation-table.component";
import { DonationComponent } from "../components/donation/principal/donation/donation.component";
import { CompanyInfoFormComponent } from "../components/footer/auth/company-info-form/company-info-form.component";
import { CompanyInfoSocialFormComponent } from "../components/footer/auth/company-info-social-form/company-info-social-form.component";
import { CompanyInfoSocialTableComponent } from "../components/footer/auth/company-info-social-table/company-info-social-table.component";
import { CompanyInfoTableComponent } from "../components/footer/auth/company-info-table/company-info-table.component";
import { HomeAdminComponent } from "../components/home/auth/home-admin.component";
import { HomeComponent } from "../components/home/principal/home.component";

import { LoginComponent } from "../components/login/login.component";
import { AdminGuard } from "../core/guards/admin.guard";

export const ROUTES: Routes= [
    {path: '',component: HomeComponent},
    {path:'nosotros',component: AboutComponent},
    {path:'contactanos',component: ContactComponent},
    {path:'alianzas/:nombre', component: DetailComponent},
    {path:'categoria/:nombre', component: CategoryDetailComponent},
    {path:'login', component: LoginComponent},
    {path:'informacion-donaciones', component: DonationComponent},

    {path:'modulo-administracion', component: HomeAdminComponent, canActivate: [AdminGuard]},
    {path:'modulo-categoria', component: CategoryTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-categoria/form', component: CategoryFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-categoria/form/:categoryName', component: CategoryFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-caracteristicas/:categoryName', component: CategoryFeaturesComponent, canActivate: [AdminGuard]},

    {path:'modulo-caracteristicas/form/:feature/:categoryId', component: CategoryFeaturesFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-caracteristicas/form/:featureId', component: CategoryFeaturesFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-quienes-somos', component: AboutTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-quienes-somos/form', component: AboutFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-quienes-somos/form/:aboutId', component: AboutFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-informacion-empresa', component: CompanyInfoTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-informacion-empresa/form', component: CompanyInfoFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-informacion-empresa/form/:companyId', component: CompanyInfoFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-informacion-empresa-redes', component: CompanyInfoSocialTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-informacion-empresa-redes/form', component: CompanyInfoSocialFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-informacion-empresa-redes/form/:socialMediaId', component: CompanyInfoSocialFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-alianzas', component: AlliancesTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-alianzas/form', component: AlliancesFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-alianzas/form/:allianceId', component: AlliancesFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-alianzas-caracteristicas/:allianceId/:allianceName', component: AlliancesFeaturesTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-alianzas-caracteristicas/form/:allianceId/:allianceName', component: AlliancesFeaturesFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-alianzas-caracteristicas/form/:allianceId/:allianceName/:featureId', component: AlliancesFeaturesFormComponent, canActivate: [AdminGuard]},

    {path:'modulo-informacion-bancaria', component: DonationTableComponent, canActivate: [AdminGuard]},
    {path:'modulo-informacion-bancaria/form', component: DonationFormComponent, canActivate: [AdminGuard]},
    {path:'modulo-informacion-bancaria/form/:donationId', component: DonationFormComponent, canActivate: [AdminGuard]},


];
