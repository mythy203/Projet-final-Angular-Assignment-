import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment:Assignment;
  nom:string;
  dateDeRendu:Date;


  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router){ }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.assignmentService.getAssignment(id)
      .subscribe(ass => this.assignment=ass )
    
      const paramsHTTP =this.route.snapshot.queryParams['nom'];
      const fragment= this.route.snapshot.fragment;
      console.log('Query Params:');
      console.log(paramsHTTP);
      console.log("Fragment :");
      console.log(fragment);
    }
  onSaveAssignment(){
      this.assignment.nom = this.nom;
      this.assignment.dateDeRendu = this.dateDeRendu;
    
      this.assignmentService.updateAssignment(this.assignment)
        .subscribe(message => console.log(message));

    //retour à la page d'acceuil
    this.router.navigate(['home'])
  }

}
