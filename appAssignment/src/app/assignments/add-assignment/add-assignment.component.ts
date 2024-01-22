import { Component,ChangeDetectorRef,/*EventEmitter*/OnInit,/* Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { Matiere } from '../matiere.model';
import { AuthService } from 'src/app/shared/auth.service';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  //@Output() nouvelAssignement = new  EventEmitter<Assignment>();
  nouvelAssignement:Assignment;
  nomDevoir:string="";
  dateRendu: Date;
  rendu:boolean=false;
  auteur:string;
  nomMatiere:string;
  photoMatiere:string;
  photoProf:string;
  note:number;
  remarques:string;
  matieres:Matiere[]=[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  renduFormGroup: FormGroup;

  
  
  constructor(private assignmentService:AssignmentsService, 
              private router:Router,
              private authservice:AuthService,
              private _formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef
             ){

  }
  ngOnInit(): void {
    if(!this.authservice.isLoggedIn){
      this.router.navigate(['/login']); 
    }
    else{
      this.assignmentService.getMatiere().
      subscribe(matieres => {
        this.matieres = matieres;
      });
    }
    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required],
      dateRendu: ['', Validators.required],
      auteur: ['', Validators.required]
    });

    this.renduFormGroup = this._formBuilder.group({
      rendu: [false]
    });

    this.secondFormGroup = this._formBuilder.group({
      nomMatiere: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      note: [''],
      remarques: ['']
    });
  
    }
    
  
  onSubmit(){
    // event.prevenDefault();
    console.log("onSubmit")
    if(this.nomDevoir && this.dateRendu){
      let newAssignment = new Assignment();
      newAssignment.id = Math.floor(Math.random()*10000);
      newAssignment.nom= this.nomDevoir;
      newAssignment.dateDeRendu=this.dateRendu;
      newAssignment.rendu=this.rendu;
      newAssignment.auteur = this.auteur;
      newAssignment.nomMatiere = this.nomMatiere;
      newAssignment.photoMatiere = this.photoMatiere;
      newAssignment.photoProf = this.photoProf;
      newAssignment.note = this.note;
      newAssignment.remarques = this.remarques

      this.assignmentService.addAssignments(newAssignment)
        .subscribe(reponse =>{
          console.log(reponse.message);
        //on navigue la page Acceuil: navigation dynamique
        this.router.navigate(['home']);
    });
      
    }
  }
  submitAssignment() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && (this.renduFormGroup.get('rendu').value ? this.thirdFormGroup.valid : true)) {
      let newAssignment = new Assignment();
      newAssignment.nom = this.firstFormGroup.get('nomDevoir').value;
      newAssignment.dateDeRendu = this.firstFormGroup.get('dateRendu').value;
      newAssignment.rendu = this.renduFormGroup.get('rendu').value;
      newAssignment.auteur = this.firstFormGroup.get('auteur').value;
      newAssignment.nomMatiere = this.secondFormGroup.get('nomMatiere').value;
  
      if (newAssignment.rendu) {
        newAssignment.note = this.thirdFormGroup.get('note').value;
        newAssignment.remarques = this.thirdFormGroup.get('remarques').value;
      }
  
      this.assignmentService.addAssignments(newAssignment).subscribe(response => {
        console.log(response.message);
        this.router.navigate(['home']);
      });
    }
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
    this.changeDetector.detectChanges(); // Indique à Angular de vérifier les changements.

    // Vous pourriez également vouloir réinitialiser les étapes ici si nécessaire.
  }
}
