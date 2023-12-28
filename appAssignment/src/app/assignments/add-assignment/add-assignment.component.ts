import { Component,/*EventEmitter*/OnInit,/* Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
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
  
  
  constructor(private assignmentService:AssignmentsService, private router:Router){

  }
  ngOnInit(): void {
    
  }
  onSubmit(){
    // event.prevenDefault();
    console.log("onSubmit")
    if(this.nomDevoir && this.dateRendu){
      let newAssignment = new Assignment();
      newAssignment.id = Math.floor(Math.random()*1000);
      newAssignment.nom= this.nomDevoir;
      newAssignment.dateDeRendu=this.dateRendu;
      newAssignment.rendu =false;
      this.assignmentService.addAssignments(newAssignment)
        .subscribe(reponse =>{
          console.log(reponse.message);
        //on navigue la page Acceuil: navigation dynamique
        this.router.navigate(['home']);
    });
      
    }
  }
}