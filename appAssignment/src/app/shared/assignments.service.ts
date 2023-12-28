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
  assignments:Assignment[] =[];
  url = "http://localhost:8010/api/assignments"
  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.url);
  }
  getNewId():number{
    return this.assignments.length+1;
  }
  addAssignments(assignment:Assignment):Observable<any>{
    return this.http.post<Assignment>(this.url, assignment);
  }
  getAssignment(id) : Observable<Assignment>{
    return this.http.get<Assignment>(this.url +"/"+id);
  }
  updateAssignment(assignment:Assignment):Observable<any>{
    return this.http.put<Assignment>(this.url, assignment);

  }
  deleteAssignment(assignment:Assignment):Observable<any>{
    return this.http.delete(this.url + "/" + assignment._id)
  }
}

