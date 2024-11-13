import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { TokensService } from '../services/tokens.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private tokenService: TokensService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Pobieramy token dostępu z usługi autentykacji
    const accessToken = this.tokenService.getToken();

    // Jeśli token istnieje, dodajemy go do nagłówka Authorization
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        // Obsługa błędów, np. gdy token jest nieprawidłowy
        if (error.status === 401) {
          // Wywołanie funkcji odświeżania tokenu
          return this.authService.refreshToken()
            .pipe(
              switchMap((value) => {
                
                this.tokenService.saveToken(value['access_token']);
                const newToken = this.tokenService.getToken()
                const refreshedReq = request.clone({
                  headers: request.headers.set('Authorization', `Bearer ${newToken}`)
                });
                return next.handle(refreshedReq);
              }
            ));
        } else {
          return throwError(error);
        }
      })
    );
  }
}

