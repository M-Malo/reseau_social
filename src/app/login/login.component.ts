import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  veutCreerCompte = false
  newUser = new User("","","","","","","2000-01-01","",false)

  fm1select = false
  fm2select = false
  m1select = false
  m2select = false


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

  selectImage(image:string){
    let source = "../../assets/images/"+image
    this.newUser.image = source
    this.fm1select = false
    this.fm2select = false
    this.m1select = false
    this.m2select = false
    
    switch (image) {
      case 'female1.jpg':
        this.fm1select = true
        break;
      case 'female2.jpg':
        this.fm2select = true
        break;
      case 'male1.jpg':
        this.m1select = true
        break;
      case 'male2.jpg':
        this.m2select = true
        break;
    }
  }

}