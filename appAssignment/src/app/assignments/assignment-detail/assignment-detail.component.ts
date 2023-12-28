import { Component,OnInit,/*Input*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  // @Input() 
  assignmentTransmis:Assignment;
  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService){}
  ngOnInit(): void {
    //on récupère l'id passé dans l'url via l'objet snapshot
    //attenetion l'url étant composé de strings on utilisera
    //"+" pour forcer la conversion en number
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
        .subscribe (a => this.assignmentTransmis = a);
  }
  onAssignementRendu(){
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu=true;

      this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe((message) => console.log(message));

      //désactiver le mode strict = false tsconfig.json (=null sinon erreur)
      this.assignmentTransmis = null;

      this.router.navigate(["home"]);

    }
  }
  onDelete(){
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe((message) => console.log(message));
    
      this.assignmentTransmis = null;
      this.router.navigate(["home"]);

  }

  onClickEdit(){
    this.router.navigate(['/assignment', this.assignmentTransmis.id,'edit'],
                       { queryParams:{'nom':this.assignmentTransmis.nom}, fragment:'edition'})
  }
  isAdmin() {
    if(this.authService.userRole==='admin'){
      return true;
    }
   return false;
  }
}
