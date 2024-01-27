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
  role:string = '';
  
  constructor(private authService: AuthService,
              private router:Router) {}
              login() {
                this.authService.login(this.username, this.password).subscribe(
                    (response) => {
                        console.log(`Login successful. Role: ${response.role}`);
                        this.router.navigate(['home']);
                    },
                    (error) => {
                        alert("Login unsuccessful");
                        console.log("Login unsuccessful", error);
                    }
                );
              }
              


}


//}


