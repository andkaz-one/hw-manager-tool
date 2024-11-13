import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { TokensService } from './tokens.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private tokensService: TokensService = inject(TokensService);
  private readonly headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded", "Access-Control-Allow-Origin": "*" });

  public currentUserSig = signal<IUser | null>(null)


  private static handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
        console.error('An error occured: ', error.error.message);
    } else {
      throwError(error)
        console.error(
            `Backend returned code ${ error.status }`,
            `body was: ${ error.error }`
        );
    }
    return throwError(error);
  }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
        .set("email", email)
        .set("password", password);

    return this.http.post<any>(`http://localhost:3000/auth/login`, params, { headers: this.headers })
        .pipe(tap(res => {
            this.tokensService.saveToken(res.tokens.access_token);
            this.tokensService.saveRefreshToken(res.tokens.refresh_token);
            this.currentUserSig.set(res.user); // save user info
        }), catchError(AuthService.handleError));
  }

  // refreshTokenFunc(refresh_token: string): Observable<any> {
  //   const params = new HttpParams()
  //       .set("rt" , refresh_token);

  //   return this.http.post<any>(`http://localhost:3000/auth/refresh-rt`, params, { headers: this.headers })
  //       .pipe(tap(res => {
  //           this.tokensService.saveToken(res.access_token);
  //           this.tokensService.saveRefreshToken(res.refresh_token);
  //       }), catchError(AuthService.handleError));
  // }


  refreshToken(): Observable<any> {
    const refreshToken = this.tokensService.getRefreshToken(); // Pobieramy refresh token z lokalnego magazynu

    return this.http.post<any>('http://localhost:3000/auth/refresh-rt', { refreshToken })
      .pipe(
        tap(response => {
          // Przechowujemy nowy access token
          this.tokensService.saveToken(response['access_token']);
          this.tokensService.saveRefreshToken(response['refresh_token']);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {   
    this.http.post(`http://localhost:3000/auth/logout`, {}, {headers: this.headers}).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.tokensService.removeToken();
        this.tokensService.removeRefreshToken();
      }
    })
  
    
  }
}
