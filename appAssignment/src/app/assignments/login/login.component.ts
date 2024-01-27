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
  console.log(role);
  
  
    if (role) {
    console.log(`Login successful. Role: ${role}`);
    // Pas besoin d'appeler setUserRole ici puisque login le fait déjà
    this.router.navigate(['home']);
  } else {
    alert("Login unsuccessful")
    console.log("Login unsuccessful");
    // Gérez l'échec de la connexion ici
  }
  
}


}


//}



