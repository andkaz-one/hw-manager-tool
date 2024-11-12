import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable()
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);

  private loggedUser$: Observable<IUser> = this.http.get<IUser>(`http://localhost:3000/auth/me`).pipe(catchError(err => of({id: null, name: 'not available', email: 'not available' })));

  currentUserSignal = toSignal<IUser>(this.loggedUser$);
  
}
