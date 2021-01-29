import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './add-news/add-news.component';
import { AuthGuard } from './auth.guard';
import { CountryPageComponent } from './country-page/country-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SignedGuard } from './signed.guard';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path : "signin", component : SigninComponent,canActivate:[SignedGuard]},
  { path : "HomePage", component : HomePageComponent},
  { path : "CountryPage/:county", component : CountryPageComponent},
  {path : "AddNews", component : AddNewsComponent, canActivate:[AuthGuard]},
  {path : "", pathMatch:"full", redirectTo:"signin"},
  {path : "**", redirectTo:"signin"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
