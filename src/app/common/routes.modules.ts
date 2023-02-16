import { Routes } from "@angular/router";
import { AboutFormComponent } from "../components/about/auth/about-form/about-form.component";
import { AboutTableComponent } from "../components/about/auth/about-table/about-table.component";
import { AboutComponent } from "../components/about/principal/about.component"; 
import { AffiliationsComponent } from "../components/affiliations/affiliations.component";
import { DetailComponent } from "../components/alliances/detail/detail.component";
import { CategoryFeaturesFormComponent } from "../components/auth/category/category-features-form/category-features-form.component";
import { CategoryFeaturesComponent } from "../components/auth/category/category-features/category-features.component";
import { CategoryFormComponent } from "../components/auth/category/category-form/category-form.component";
import { CategoryTableComponent } from "../components/auth/category/category-table/category-table.component";
import { HomeAdminComponent } from "../components/auth/home/home-admin/home-admin.component";
import { CategoryDetailComponent } from "../components/category/category-detail/category-detail.component";

import { ContactComponent } from "../components/contact/contact.component";
import { CompanyInfoFormComponent } from "../components/footer/auth/company-info-form/company-info-form.component";
import { CompanyInfoTableComponent } from "../components/footer/auth/company-info-table/company-info-table.component";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { AdminGuard } from "../core/guards/admin.guard";

export const ROUTES: Routes= [
    {path: '',component: HomeComponent},
    {path:'nosotros',component: AboutComponent},
    {path:'afiliaciones',component: AffiliationsComponent},
    {path:'contactanos',component: ContactComponent},
    {path:'alianzas/:nombre', component: DetailComponent},
    {path:'categoria/:nombre', component: CategoryDetailComponent},
    {path:'login', component: LoginComponent},

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
    



];