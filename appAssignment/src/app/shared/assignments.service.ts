import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import{Observable, catchError, of, tap,forkJoin, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from '../shared/assignments-data'; // Assurez-vous que le chemin est correct
import { bdInitialMatireres } from './matieres-data';
import { Matiere } from '../assignments/matiere.model';
import { MatiereService } from './matiere.service';

@Injectable({
  // permet d'éviter de l'ajouter dans les modules...?
  providedIn: 'root'
})
export class AssignmentsService {
  listeMatiere: Matiere[];

  constructor(private http:HttpClient,
              private matiere:MatiereService ) { }
  assignments:Assignment[] =[];
  //url de Heroku
  // url = "https://api-cours-angular2023-6bb9d00082cc.herokuapp.com/api/assignments"
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
  getAssignment(id:number) : Observable<Assignment>{
    return this.http.get<Assignment>(this.url +"/"+id)
    .pipe(
      tap(a => {
        return console.log("tap: " + a.nom);
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id + "a échoué"))
     );
  }
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
  updateAssignment(assignment:Assignment):Observable<any>{
    return this.http.put<Assignment>(this.url, assignment);

  }
  deleteAssignment(assignment:Assignment):Observable<any>{
    return this.http.delete(this.url + "/" + assignment._id)
  }
  listeMatieres(){
    this.matiere.getMatieres().subscribe(matieres => {
      this.listeMatiere = matieres;
    });
  }
  // peuplerBDavecForkJoin(): Observable<any> {
  //   let appelsVersAddAssignment: Observable<any>[] = [];

  //   bdInitialAssignments.forEach(a => {
  //     const nouvelAssignment = new Assignment();
  //     nouvelAssignment.id = a.id;
  //     nouvelAssignment.nom = a.nom_devoir;
  //     nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelAssignment.rendu = a.rendu;
  //     nouvelAssignment.auteur = a.auteur;
  //     nouvelAssignment.remarques = a.remarques;
  //     nouvelAssignment.note = a.note;
  //     const randomElement = this.getRandomElement(bdInitialMatireres);
  //     nouvelAssignment.nomMatiere = randomElement.nomMatiere;
  //     nouvelAssignment.photoMatiere = randomElement.photoMatiere;
  //     nouvelAssignment.photoProf = randomElement.photoProf;


  //     appelsVersAddAssignment.push(this.addAssignments(nouvelAssignment));
  //   });

  //   return forkJoin(appelsVersAddAssignment);
  // }
  peuplerBDavecForkJoin(): Observable<any> {
    return this.matiere.getMatieres().pipe(
      switchMap(matieres => {
        let appelsVersAddAssignment: Observable<any>[] = [];
        bdInitialAssignments.forEach(a => {
          const nouvelAssignment = new Assignment();
          nouvelAssignment.id = a.id;
          nouvelAssignment.nom = a.nom_devoir;
          nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
          nouvelAssignment.rendu = a.rendu;
          nouvelAssignment.auteur = a.auteur;
          nouvelAssignment.remarques = a.remarques;
          nouvelAssignment.note = a.note;  
          const randomMatiere = this.getRandomElement(matieres);
          nouvelAssignment.nomMatiere = randomMatiere.nomMatiere;
          nouvelAssignment.photoMatiere = randomMatiere.photoMatiere;
          nouvelAssignment.photoProf = randomMatiere.photoProf;
  
          appelsVersAddAssignment.push(this.addAssignments(nouvelAssignment));
        });
  
        return forkJoin(appelsVersAddAssignment);
      })
    );
  }
  
  
  getRandomElement(array: any[]):any{
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex]
  }
  getMatiere(): Observable<Matiere[]> {
    this.listeMatiere = bdInitialMatireres;
    return of(bdInitialMatireres);
  }
  getMatiereByID(id:number):Observable<Matiere | undefined>{
    return of(this.listeMatiere.find(a=>a.id===id))
  }
  
  // Add a new method for getting paginated assignments
  getAssignmentsPagine(page:number,limit:number) : Observable<any>{
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }
 
  
}

