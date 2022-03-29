import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  constructor(private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if(sessionStorage.getItem('user') !== null){
      return true;
    } else {
      this.router.navigate(['login'])
    }
    return false;

  }

}
