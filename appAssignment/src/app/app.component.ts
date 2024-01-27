import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-app';
  isPeuplementEnCours = false;
  
  opened=false;

  constructor(public authService:AuthService,
              private router:Router,
              private assignmentService:AssignmentsService){}

  logout() {
    this.authService.logout();
  }
  isAdmin() {
    if(this.authService.userRole==='admin'){
      return true;
    }
   return false;
  }
  peuplerBD() {
    this.isPeuplementEnCours = true;
    this.assignmentService.peuplerBDavecForkJoin().subscribe({
      next: (response) => {
        // alert('La base de données a été peuplée avec succès');
        console.log("La base de données a été peuplée avec succès", response);
        this.isPeuplementEnCours = false;
        window.location.reload();


      },
      error: (err) => {
        alert('Erreur lors du peuplement de la base de données');
        console.error("Erreur lors du peuplement de la base de données", err);
        this.isPeuplementEnCours = false;
      }
    });
    this.router.navigate(['/home']);
  }
  onAddAssignmentClick() {
    if (this.authService.isLoggedIn() && this.isAdmin()) {
      this.router.navigate(['/add-assignment']);
    }
  }

}
