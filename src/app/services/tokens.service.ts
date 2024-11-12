import { Injectable } from '@angular/core';

const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor() { }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): any {
      return localStorage.getItem('refresh_token');
  }

  saveToken(token: string): void {
      localStorage.setItem('access_token', token);
  }

  saveRefreshToken(refreshToken: string): void {
      localStorage.setItem('refresh_token', refreshToken);
  }

  removeToken(): void {
      localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
      localStorage.removeItem(REFRESH_TOKEN);
  }
}
