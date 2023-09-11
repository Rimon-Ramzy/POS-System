import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CashersDataService } from './cashers-data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any = null;

  constructor(private _http: HttpClient, private _router: Router, private cashersDataService: CashersDataService, private afAuth: AngularFireAuth) { }

  signup(email: string, password: string) {
    return this._http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  }

  login(email: string, password: string) {
    return this._http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  }

  logout() {
    this.user.next(null);
    this._router.navigate(['/login']);
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );
    if (loadedUser['_token']) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An Unknown Error Occured"
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email is exists already";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does not exist";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "This password is not correct";
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate,
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }



  storeAdmin(admin: any) {
    // const admin: any[] = this.cashersDataService.getCasher();
    // const admin = {
    //   name: name,
    //   email: email,
    //   localId: localId
    // }
    return this._http.put('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/cashers.json', admin)
  }

  fetchAdmin() {
    return this._http.get('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/cashers.json')
      .pipe(
        map((cashers: any) => {
          return cashers
        }),
        tap((cashers: any) => {
          // cashers?.map(
          // (res: any) => {
          this.cashersDataService.setCasher(cashers);
          // this.cashersDataService.setCasher(res);
          // }
          // )
        })
      )
  }








  deleteCurrentUser() {
    this.afAuth.currentUser
      .then((user) => {
        if (user) {
          return user.getIdToken();
        } else {
          // User is not authenticated
          throw new Error('User not authenticated');
        }
      })
      .then((idToken) => {
        // Use the ID token to delete the user
        this.deleteAdmin(idToken);
      })
      .catch((error) => {
      });
  }

  deleteAdmin(idToken: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + idToken
    });
    this._http.delete(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${environment.firebase.apiKey}`,
      { headers: headers }
    )
      .subscribe(
        (response) => {
        },
        (error) => {
        }
      );
  }
}

