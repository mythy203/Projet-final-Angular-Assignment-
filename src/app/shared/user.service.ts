// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //heroku
  // private apiUrl = 'http://localhost:8010/api/users';
  private apiUrl = 'https://api-cours-angular2023-6bb9d00082cc.herokuapp.com/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
