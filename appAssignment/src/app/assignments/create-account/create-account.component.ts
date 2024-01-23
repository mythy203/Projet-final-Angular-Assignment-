import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  newUser = {
          username: '',
          password: '',
          role: 'user' // Valeur par défaut, pourrait être changée par des boutons radio ou un select
  };
  constructor(private userService: UserService,private router: Router) {}
  onCreateAccount() {
    // Vous pouvez ajouter ici une logique pour déterminer le rôle basé sur les boutons radio
    this.userService.addUser(this.newUser).
    subscribe(
      (response) => {
        alert('Compte créé avec succès. Veuillez vous connecter.');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        alert('Erreur lors de la création du compte.');
        console.error('Erreur lors de la création du compte', error);
      }
    );
  }
  
  
}
