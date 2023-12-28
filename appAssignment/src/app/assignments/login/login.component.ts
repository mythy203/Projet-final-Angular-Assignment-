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
  
 
  login(){
    let role = this.authService.login(this.username, this.password);

    if(!this.authService.userRole && role==='user'){
      console.log(`Login successful. Role:${role} ` );
      // this.authService.logOut();

    }else{
      console.log(`Login successful. Role:${role} ` );
      this.authService.userRole ='admin';

    }
    this.router.navigate(['home']);

  }

}



