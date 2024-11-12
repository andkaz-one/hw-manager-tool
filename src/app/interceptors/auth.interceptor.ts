import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { TokensService } from '../services/tokens.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private tokenService: TokensService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Pobieramy token dostępu z usługi autentykacji
    const accessToken = this.tokenService.getToken();

    // Jeśli token istnieje, dodajemy go do nagłówka Authorization
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
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
              switchMap(() => {
                return next.handle(request);
              })
            );
        } else {
          return throwError(error);
        }
      })
    );
  }
}

