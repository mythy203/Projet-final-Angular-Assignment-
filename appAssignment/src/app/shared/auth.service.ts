import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loggedIn = false;
  userRole: string | null = null;
  private users = [
    { username: 'user1', password: '123', role: 'user' },
    { username: 'admin1', password: '123', role: 'admin' }
  ];
  login(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    return user ? user.role : null;
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
/*
  logIn() {
    this.loggedIn = true;
    this.userRole = 'admin'
  }

  logOut() {
    this.userRole ='user'

    this.loggedIn = false;
  }*/
  // revoie une promesse qui, lorsqu'elle est "résolved", renvoie si l'utilisateur
  // est admin ou pas. Pour le moment, renvoie true si il est loggé...
 

}
/*pour comprendre code de login()
 *  login(username: string, password: string): string | null {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      this.userRole = user.role;
      return this.userRole;
    } else {
      this.userRole = null;
      return null;
    }
  }
*/ 
