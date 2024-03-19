import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  veutCreerCompte = false

  constructor(private authService: AuthService,private router: Router) {
    
  }
  switchMode(){
    this.veutCreerCompte = !this.veutCreerCompte
  }

  login(){
    const url = "/accueil"
    this.authService.login()
    this.router.navigateByUrl(url);
    this.router.navigate([url]);
  }

}
