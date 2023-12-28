import {  CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //injection par programme (au lieu de le faire dans
  //le constructeur d'un composznt)


  let authService = inject(AuthService);
  let router = inject(Router);

  // si ça renvoie true, alors, on peut activer la route
  return authService.isAdmin()
    .then(authentifie => {
      if(authentifie){
        console.log("vous êtes admin, navigation autorisée!");
        return true;
      } else {
        console.log("vous n'êtes pas admin! Navigation refusée!");
        //et on retour vers la page d'acceuil
        router.navigate(['home']);
        return false;
      }
    })
  }





    
  
  
  
  
  
  
  
  
  
  
  
  
  


