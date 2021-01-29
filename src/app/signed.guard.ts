import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CovidService } from './covid.service';

@Injectable({
  providedIn: 'root'
})
export class SignedGuard implements CanActivate {
  constructor(private covidService : CovidService, 
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.covidService.userIn()){
        console.log(this.covidService.getUser());
        this.router.navigate(["HomePage"]);
        console.log(this.covidService.getUser());

      }
    return true;
  }
  
}
