import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8010/api/users';
  // loggedIn = false;
  private isAuthenticated = false; // Nouvelle propriété pour suivre l'état de connexion
  userRole: string | null = null;
  // private users = [
  //   { username: 'user1', password: '123', role: 'user' },
  //   { username: 'admin1', password: '123', role: 'admin' }
  // ];
  private users = [];
  constructor(private http: HttpClient) {
    this.fetchUsers();
  }
  private fetchUsers() {
    this.http.get<any[]>(this.userUrl).subscribe(
      data => this.users = data,
      error => console.log('Error fetching users:', error)
    );
  }

  login(username: string, password: string): string | null {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.isAuthenticated = true;  // Utilisateur est authentifié
      this.userRole = user.role;    // Mettre à jour le rôle de l'utilisateur
      return user.role;             // Retourne le rôle ('user' ou 'admin')
    } else {
      this.isAuthenticated = false; // Échec de l'authentification
      this.userRole = null;
      return null;
    }
  }

  setUserRole(role: string | null) {
    this.userRole = role;
  }
  logout() {
    this.userRole = null;
    this.isAuthenticated = false; // Réinitialiser l'état de connexion
  }

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
