import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  status: boolean = false;

  constructor(
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      localStorage.hasOwnProperty('access_token') &&
      localStorage.hasOwnProperty('refresh_token')
    ) {
      if (
        localStorage.getItem('access_token') != '' &&
        localStorage.getItem('refresh_token') != ''
      ) {
        return true;
      } else {
        this.router.navigateByUrl('/auth');
        return false;
      }
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
