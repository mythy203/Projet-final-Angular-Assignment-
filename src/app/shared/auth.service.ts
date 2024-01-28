import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //heroku
  // private userUrl = 'http://localhost:8010/api/users';
  private userUrl = 'https://api-cours-angular2023-6bb9d00082cc.herokuapp.com/api/users';
  private isAuthenticated = false; 
  userRole: string | null = null;
  loggedInUser: string | null = null;
  private username: string | null = null;
  role: string;
  
  
  private users = [];
  constructor(private http: HttpClient) {
    this.autoLogin();
  }
  
login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.userUrl}/login`, { username, password })
    .pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);

        // token (ex: 24 h), test 5 min
        const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 h
        localStorage.setItem('tokenExpiration', expirationTime.toString());

        this.userRole = response.role;
        this.username = response.username;
        this.loggedInUser = username;
        this.isAuthenticated = true;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
}


logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('tokenExpiration'); 

  this.userRole = null;
  this.username = null;
  this.isAuthenticated = false;
}
private autoLogin(): void {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (tokenExpiration) {
    const expirationTime = parseInt(tokenExpiration);
    if (new Date().getTime() <= expirationTime) {
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      this.username = username;
      this.userRole = role;
      this.isAuthenticated = true;
      this.loggedInUser = username;
    } else {
      this.logout();
    }
  }
}

private isTokenExpired(): boolean {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (!tokenExpiration) {
    return true; 
  }
  const expirationTime = parseInt(tokenExpiration);
  return new Date().getTime() > expirationTime;
}

  setUserRole(role: string | null) {
    this.userRole = role;
  }
  

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve,reject) => {
        resolve(this.userRole)

      }
    );
    return isUserAdmin;
  }
}


