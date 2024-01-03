import { Component,OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

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
  isPeuplementEnCours = false;

  // //Pour gérer la pagination
  // page: number=1;
  // limit: number=10;
  // totalDocs: number;
  // totalPages: number;
  // hasPrevPage: boolean;
  // prevPage: number;
  // hasNextPage: boolean;
  // nextPage: number;

  // Pagination properties
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;



  constructor(private assignmentService:AssignmentsService,
              private authService:AuthService,
              private router:Router){}
  
  ngOnInit(): void {
    // this.getAssignments();
    this.getAssignmentsPaginated(this.page, this.limit);

    // this.assignmentService.getAssignmentsPagine(this.page, this.limit)
    // .subscribe(data => {
    //   this.assignments = data.docs;
    //   this.page = data.page;
    //   this.limit = data.limit;
    //   this.totalDocs = data.totalDocs;
    //   this.totalPages = data.totalPages;
    //   this.hasPrevPage = data.hasPrevPage;
    //   this.prevPage = data.prevPage;
    //   this.hasNextPage = data.hasNextPage;
    //   this.nextPage = data.nextPage;
    //   console.log("données reçues");
    // });

    
  }
  getAssignmentsPaginated(page: number, limit: number) {
    this.assignmentService.getAssignmentsPagine(page, limit)
      .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
      });
  }
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsPaginated(this.page, this.limit);
  }

  getAssignments(){
    this.assignmentService.getAssignments()
    .subscribe(assignments => {
      this.assignments =assignments;
    })
  }
  peuplerBD() {
    this.isPeuplementEnCours = true;
    this.assignmentService.peuplerBDavecForkJoin().subscribe({
      next: (response) => {
        console.log("La base de données a été peuplée avec succès", response);
        this.isPeuplementEnCours = false;
        // ...
      },
      error: (err) => {
        console.error("Erreur lors du peuplement de la base de données", err);
        this.isPeuplementEnCours = false;
        // ...
      }
    });
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
