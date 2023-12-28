import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import{Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  // permet d'éviter de l'ajouter dans les modules...?
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http:HttpClient ) { }
  assignments:Assignment[] =[
    // {
    //   id:1,
    //   nom: "TP1 Web components à rendre",
    //   dateDeRendu:new Date('2023-11-12'),
    //   rendu:true
    // },
    // {
    //   id:2,
    //   nom: "TP2 Angular à rendre",
    //   dateDeRendu:new Date('2023-12-12'),
    //   rendu:false
    // },
    // {
    //   id:3,
    //   nom: "Mini projet Angular à rendre",
    //   dateDeRendu:new Date('2024-01-12'),
    //   rendu:false
    // }
  ]
   //1
  url = "http://localhost:8010/api/assignments"
  getAssignments():Observable<Assignment[]>{
    //Imaginons qu'on envoie une requête dans le cloud
    // et que le serveur à son tour envoie une requête sur une BD
    //dans le cloud.. on en sait pas exactement combien de temps
    // On va donc non pas renvoyer les données, mais plutôt un object "observable"
   //2
    return this.http.get<Assignment[]>(this.url);
    // return of(this.assignments);
  }
  getNewId():number{
    return this.assignments.length+1;
  }
  addAssignments(assignment:Assignment):Observable<string>{
    this.assignments.push(assignment);
    return of("Assignment ajouté")
  }
  getAssignment(id) : Observable<Assignment>{
    //apres httpClient 
    //3
    return this.http.get<Assignment>(this.url +"/"+id);
    // return of(this.assignments.find(ass => ass.id===id));
  }
  updateAssignment(assignment:Assignment):Observable<string>{
    this.assignments.forEach((a, index)=>{
      if(a === assignment){
        this.assignments[index]=assignment;
      }
    });
    // let pos = this.assignments.indexOf(assignment);
    // this.assignments[pos]=assignment;
    return of("Assignment modifié")
  }
  deleteAssignment(assignment:Assignment):Observable<string>{
    let pos = this.assignments.indexOf(assignment);
     this.assignments.splice(pos,1);
    return of("Assignment supprimé")
  }
}

