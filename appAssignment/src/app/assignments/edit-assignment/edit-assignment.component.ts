import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Matiere } from '../matiere.model';
import { MatiereService } from 'src/app/shared/matiere.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment:Assignment;
  nom:string;
  dateDeRendu:Date;
  nomMatiere:string;
  matieres:Matiere[]=[];
  photoMatiere:string;
  photoProf:string;
  rendu:boolean=false;
  auteur:string;
  note:number;
  remarques:string;



  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private matiereService:MatiereService,
              private changeDetector: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.matiereService.getMatieres().
      subscribe(matieres => {
        this.matieres = matieres;
      });
    const id = +this.route.snapshot.params['id']
    this.assignmentService.getAssignment(id)
      .subscribe(ass => {this.assignment=ass; 
                        this.nom = this.assignment.nom; 
                        this.dateDeRendu = this.assignment.dateDeRendu;
                        this.auteur=this.assignment.auteur;
                        this.rendu=this.assignment.rendu;
                        this.note=this.assignment.note;
                        this.remarques=this.assignment.remarques;
                        this.nomMatiere=this.assignment.nomMatiere} )
    
      const paramsHTTP =this.route.snapshot.queryParams['nom'];
      const fragment= this.route.snapshot.fragment;
      console.log('Query Params:');
      console.log(paramsHTTP);
      console.log("Fragment :");
      console.log(fragment);
    }
  onSaveAssignment(){
    if(!this.assignment) return;

    if(this.nom){
      this.assignment.nom = this.nom;
    }
    if(this.dateDeRendu){
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if(this.auteur){
      this.assignment.auteur =  this.auteur;
    }
    if(this.note){
      this.assignment.note =  this.note;
    }
    if(this.remarques){
      this.assignment.remarques =  this.remarques;
    }
    if(this.rendu){
      this.assignment.rendu =true;
      this.assignment.note = this.note || this.assignment.note;
      this.assignment.remarques = this.remarques || this.assignment.remarques;
    } else {
      this.assignment.rendu =false;
      this.assignment.note = null;
      this.assignment.remarques = '';
    }
    
    if(this.nomMatiere){
      this.assignment.nomMatiere =  this.nomMatiere;
      this.assignment.photoMatiere = this.photoMatiere;
      this.assignment.photoProf = this.photoProf;
    }
    
      this.assignmentService.updateAssignment(this.assignment)
        .subscribe(reponse => {
          console.log("Réponse du serveur" + reponse.message);
          this.router.navigate(['home']);
  });

   
  }
  onMatiereSelected() {
    const matiere = this.matieres.find(m => m.nomMatiere=== this.nomMatiere);
    if (matiere) {
      this.photoMatiere = matiere.photoMatiere;
      this.photoProf = matiere.photoProf;
    }
  }
  onRenduChange() {
    // Cette méthode est appelée chaque fois que la valeur de 'rendu' change.
    this.changeDetector.detectChanges(); 
  }

}
