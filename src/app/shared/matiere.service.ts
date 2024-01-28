import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Matiere } from '../assignments/matiere.model';
@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http:HttpClient) { }
  //heroku
  // url = "http://localhost:8010/api/matieres"
  url = "https://api-cours-angular2023-6bb9d00082cc.herokuapp.com/api/matieres";
  getMatieres():Observable<Matiere[]>{
    return this.http.get<Matiere[]>(this.url);
    
  }

}
