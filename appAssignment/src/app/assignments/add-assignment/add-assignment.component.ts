import { Component,ChangeDetectorRef,/*EventEmitter*/OnInit, ViewChild,/* Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { Matiere } from '../matiere.model';
import { AuthService } from 'src/app/shared/auth.service';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { MatiereService } from 'src/app/shared/matiere.service';
import { MatStepper } from '@angular/material/stepper';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
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
  isLinear = true;

  @ViewChild(MatStepper) stepper: MatStepper;

  
  constructor(private assignmentService:AssignmentsService, 
              private router:Router,
              private authservice:AuthService,
              private _formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef,
              private matiereService: MatiereService
             ){

  }
  ngOnInit(): void {
    if(!this.authservice.isLoggedIn){
      this.router.navigate(['/login']); 
    }
    else{
      this.matiereService.getMatieres().
      subscribe(matieres => {
        this.matieres = matieres;
      });
    }
    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required],
      dateRendu: ['', Validators.required],
      auteur: ['', Validators.required]
    });

    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      dateRendu: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      nomMatiere: ['', Validators.required],
      auteur: ['', Validators.required],
    });

    this.renduFormGroup = this._formBuilder.group({
      rendu: [false],
      note: [''],
      remarques: ['']
    });
  
    }
    
  
  submitAssignment() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && (this.renduFormGroup.value.rendu ? this.thirdFormGroup.valid : true)) {
      const newAssignment: Assignment = {
        nom: this.firstFormGroup.get('nomDevoir').value,
        dateDeRendu: this.secondFormGroup.get('dateRendu').value,
        rendu: this.renduFormGroup.value.rendu,
        auteur: this.thirdFormGroup.get('auteur').value,
        nomMatiere: this.thirdFormGroup.get('nomMatiere').value,
        note: null,
        remarques: null,
        _id: '',
        id: Math.floor(Math.random()*100000),
        photoMatiere: this.photoMatiere,
        photoProf: this.photoProf,
       
      };

      if (newAssignment.rendu) {
        newAssignment.note = this.renduFormGroup.get('note').value;
        newAssignment.remarques = this.renduFormGroup.get('remarques').value;
      }
      
      console.log('photoMatiere before submit:', this.photoMatiere);
      console.log('photoProf before submit:', this.photoProf);
      this.assignmentService.addAssignments(newAssignment).subscribe(response => {
        console.log(response.message);
        this.router.navigate(['home']);
      });
    }
  }
  onMatiereSelecte(event: MatSelectChange) {
    const nomMatiere = event.value;
    const matiere = this.matieres.find(m => m.nomMatiere === nomMatiere);
    if (matiere) {
      this.photoMatiere = matiere.photoMatiere;
      this.photoProf = matiere.photoProf;
    }
  }
  
  
  onRenduChange() {
    this.changeDetector.detectChanges(); 
  }

  onNext(step: number) {
    switch (step) {
      case 1:
        if (this.firstFormGroup.valid) {
          this.stepper.next();
        }
        break;
      case 2:
        if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
          this.stepper.next();
        }
        break;
      case 3:
          if (this.secondFormGroup.valid && this.thirdFormGroup.valid) {
            this.stepper.next();
          }
        break;
      default:
        break;
    }
  }
  onPrevious() {
    this.stepper.previous();
  }

}

