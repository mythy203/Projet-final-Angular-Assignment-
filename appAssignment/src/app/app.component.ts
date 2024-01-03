import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-app';
  opened=false;

  constructor(private authService:AuthService,
              private router:Router){}

  
//slider
 /* login(){
    if(this.authService.loggedIn){
      this.authService.logOut();
      this.router.navigate(['home']);
    }else{
      this.authService.loggedIn =true;


    }
    console.log("click")
    
  }*/
}
