import { Component,OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments !"
  // ajoutActive=false;

  opened=false;
  assignementSelectionne!:Assignment;// assignementSelectionne:Assignment; (désactiver le mode strict = false tsconfig.json)
  formVisible =false;

  assignments!:Assignment[];
  


  constructor(private assignmentService:AssignmentsService,
              private authService:AuthService,
              private router:Router){}
  
  ngOnInit(): void {
    // this.assignments = this.assignmentService.getAssignment();
    this.getAssignments();
    // setTimeout(()=>{
    //   this.ajoutActive =true;
    // },2000)

  }
  getAssignments(){
    this.assignmentService.getAssignments()
    .subscribe(assignments => {
      this.assignments =assignments;
    })
  }
  /*
  login(){
    if(this.authService.loggedIn){
      this.authService.logOut();
      this.router.navigate(['home']);
    }else{
      this.authService.loggedIn =true;


    }
    
  }*/
  /*
  assignmentClique(assignment:Assignment) {
    this.assignementSelectionne = assignment;
  }*/
  /*
  onAddAssignmentBtnClick(){
    this.formVisible=true;
  }*/
  /*
  onNouvelAssignement(event:Assignment){
    // event est un Assignment ajouté par le fils (add-assignment)
    // this.assignments.push(event);
    this.assignmentService.addAssignments(event)
    .subscribe((message)=> console.log(message));

    //on cache le formulaire d'ajout
    this.formVisible=false;
  }*/
}
