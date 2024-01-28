import { Component,OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Matiere } from './matiere.model';
import { bdInitialMatireres } from '../shared/matieres-data';
import { Observable, of } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';


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
  assignments!:MatTableDataSource<Assignment>;
  isPeuplementEnCours = false;
  searchText: string = '';
  filterRendu = false;
  filterNonRendu = false;
  showFilters: boolean = false;
  assignment: Assignment[] = [];


  listeMatiere:Matiere[];
  // Pagination properties
    page: number = 1;
    limit: number = 10;
    totalDocs: number = 0;
    totalPages: number = 0;
    hasPrevPage: boolean = false;
    prevPage: number = 0;
    hasNextPage: boolean = false;
    nextPage: number = 0;

  // Colonnes à afficher dans la table
  // columnsToDisplay: string[] = ['nom', 'dateDeRendu', 'rendu','nomMatiere','photoMatiere','photoProf','auteur','note','remarques'];
  columnsToDisplay: string[] = ['nom', 'dateDeRendu', 'rendu','nomMatiere','photoMatiere','photoProf','auteur'];

  // Récupérez une référence au trieur de la table
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private assignmentService:AssignmentsService,
              private authService:AuthService,
              private router:Router){}

  ngOnInit(): void {
    // this.getAssignments();

    this.getAssignmentsPaginated(this.page, this.limit);
    // Créez la source de données de table avec vos assignments


    // this.dataSource = new MatTableDataSource(this.assignments);
    // Triez la table en utilisant le trieur
    // this.dataSource.sort = this.sort;

    this.assignments.filterPredicate = (data: Assignment, filter: string) => {
      return data.nom.toLowerCase().includes(filter);
    };
  }
  ngAfterViewInit(): void {
    this.getAssignmentsPaginated(this.page, this.limit);
  }

  getAssignmentsPaginated(page: number, limit: number) {
    const filterParams = `&rendu=${this.filterRendu}&nonRendu=${this.filterNonRendu}`;

    this.assignmentService.getAssignmentsPagine(page, limit)
      .subscribe(data => {
        const filteredAssignments = data.docs.filter(assignment => {
          if (this.filterRendu && assignment.rendu) {
            return true;
          }
          if (this.filterNonRendu && !assignment.rendu) {
            return true;
          }
          if (!this.filterRendu && !this.filterNonRendu) {
            return true;
          }
          return false;
        });


        this.assignments = new MatTableDataSource(filteredAssignments);
        this.assignments.sort = this.sort;
        this.sort.disableClear = true;


        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;

        console.log("Données reçues");
      });
  }

  goToFirstPage() {
    if (this.page > 1) {
      this.page = 1;
      this.getAssignmentsPaginated(this.page, this.limit);
    }
  }

  goToPrevPage() {
    if (this.page > 1) {
      this.page--;
      this.getAssignmentsPaginated(this.page, this.limit);
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAssignmentsPaginated(this.page, this.limit);
    }
  }

  goToLastPage() {
    if (this.page < this.totalPages) {
      this.page = this.totalPages;
      this.getAssignmentsPaginated(this.page, this.limit);
    }
  }


  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsPaginated(this.page, this.limit);
  }


  peuplerBD() {
    this.isPeuplementEnCours = true;
    this.assignmentService.peuplerBDavecForkJoin().subscribe({
      next: (response) => {
        console.log("La base de données a été peuplée avec succès", response);
        this.isPeuplementEnCours = false;
        window.location.reload();
      },
      error: (err) => {
        console.error("Erreur lors du peuplement de la base de données", err);
        this.isPeuplementEnCours = false;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.assignments.filter = filterValue;
  }
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
  
  filterRenduChange(event: MatCheckboxChange) {
    console.log('filterRenduChange', event.checked);
    this.filterRendu = event.checked;
    this.getAssignmentsPaginated(this.page, this.limit);
  }

  filterNonRenduChange(event: MatCheckboxChange) {
    console.log('filterNonRenduChange', event.checked);
    this.filterNonRendu = event.checked;
    this.getAssignmentsPaginated(this.page, this.limit);
  }
  
  
  
 

 
}
