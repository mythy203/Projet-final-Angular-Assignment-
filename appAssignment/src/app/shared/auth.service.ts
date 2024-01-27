import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8010/api/users';
  // loggedIn = false;
  private isAuthenticated = false; // Nouvelle propriété pour suivre l'état de connexion
  userRole: string | null = null;
  loggedInUser: string | null = null;
  private username: string | null = null;
  role: string;
  
  // private users = [
  //   { username: 'user1', password: '123', role: 'user' },
  //   { username: 'admin1', password: '123', role: 'admin' }
  // ];
  private users = [];
  constructor(private http: HttpClient) {
    // this.fetchUsers();
    this.autoLogin();
  }
  // private fetchUsers() {
  //   this.http.get<any[]>(this.userUrl).subscribe(
  //     data => this.users = data,
  //     error => console.log('Error fetching users:', error)
  //   );
  // }
  
  // login(username: string, password: string): string | null {
  //   const user = this.users.find(u => u.username === username && u.password === password);
  //   if (user) {
  //     this.isAuthenticated = true;  // Utilisateur est authentifié
  //     this.userRole = user.role;    // Mettre à jour le rôle de l'utilisateur
  //     this.loggedInUser = username;
  //     return user.role;             // Retourne le rôle ('user' ou 'admin')
  //   } else {
  //     this.isAuthenticated = false; // Échec de l'authentification
  //     this.userRole = null;
  //     this.loggedInUser = null;
  //     return null;
  //   }
  // }
// Function to handle login

login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.userUrl}/login`, { username, password })
    .pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);

        // Lưu thời gian hết hạn của token (ví dụ: 24 giờ), test 1 min
        const expirationTime = new Date().getTime() + 5*1000; // 24 giờ
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
  localStorage.removeItem('tokenExpiration'); // Xóa cả thông tin thời gian hết hạn token

  this.userRole = null;
  this.username = null;
  this.isAuthenticated = false;
}
private autoLogin(): void {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (tokenExpiration) {
    const expirationTime = parseInt(tokenExpiration);
    if (new Date().getTime() <= expirationTime) {
      // Token vẫn còn hiệu lực
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      this.username = username;
      this.userRole = role;
      this.isAuthenticated = true;
      this.loggedInUser = username;
    } else {
      // Token đã hết hạn, xóa thông tin trong local storage
      this.logout();
    }
  }
}

// ...

// Kiểm tra xem token đã hết hạn chưa
private isTokenExpired(): boolean {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (!tokenExpiration) {
    return true; // Không có thông tin về thời gian hết hạn
  }
  const expirationTime = parseInt(tokenExpiration);
  return new Date().getTime() > expirationTime;
}

// ...

  setUserRole(role: string | null) {
    this.userRole = role;
  }
  // logout() {
  //   this.userRole = null;
  //   this.isAuthenticated = false; // Réinitialiser l'état de connexion
  //   this.loggedInUser = null;
  // }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve,reject) => {
        resolve(this.userRole)
        // resolve(this.loggedIn);

      }
    );
    return isUserAdmin;
  }
}


