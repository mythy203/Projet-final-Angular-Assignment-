import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router:Router) {}
  login() {
  const role = this.authService.login(this.username, this.password);
    if (role) {
    console.log(`Login successful. Role: ${role}`);
    // Pas besoin d'appeler setUserRole ici puisque login le fait déjà
    this.router.navigate(['home']);
  } else {
    console.log("Login unsuccessful");
    // Gérez l'échec de la connexion ici
  }
}

 
  // login(){
  //   let role = this.authService.login(this.username, this.password);

  //   // if(!this.authService.userRole && role==='user'){
  //     if(!this.authService.userRole){

  //     console.log(`Login successful. Role:${role} ` );
  //     // this.authService.logOut();

  //   }else{
  //     console.log(`Login successful. Role:${role} ` );
  //     this.authService.userRole ='admin';

  //   }
  //   this.router.navigate(['home']);

  // }

}



