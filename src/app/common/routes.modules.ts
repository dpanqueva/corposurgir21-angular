import { Routes } from "@angular/router";
import { AboutComponent } from "../components/about/about.component";
import { AffiliationsComponent } from "../components/affiliations/affiliations.component";
import { DetailComponent } from "../components/alliances/detail/detail.component";
import { CategoryDetailComponent } from "../components/category/category-detail/category-detail.component";

import { ContactComponent } from "../components/contact/contact.component";
import { HomeComponent } from "../components/home/home.component";

export const ROUTES: Routes= [
    //{path: '', redirectTo:'/home', pathMatch:'full'},
    {path: '',component: HomeComponent},
    {path:'nosotros',component: AboutComponent},
    //{path:'home',component: HomeComponent},
    {path:'afiliaciones',component: AffiliationsComponent},
    {path:'contactanos',component: ContactComponent},
    {path:'alianzas/:nombre', component: DetailComponent},
    {path:'categoria/:nombre', component: CategoryDetailComponent}

];