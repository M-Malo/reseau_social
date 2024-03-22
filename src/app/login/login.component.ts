import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UsersBackService } from '../users-back.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  veutCreerCompte = false
  user = new User("", "", "", "", "", "", "", false, "");
  identifitant = "";
  motDePasse = "";

  fm1select = false
  fm2select = false
  m1select = false
  m2select = false


  constructor(private authService: AuthService,private router: Router, private usersBackService: UsersBackService) {
    
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


  async submitUser() {
    console.log(this.user);
    (await this.usersBackService.addUser(this.user)).subscribe(
      () => {
        console.log("L'utilisateur a été ajouté avec succès.");
        // Réinitialiser le formulaire après l'ajout réussi
        this.user = new User("", "", "", "", "", "", "", false, "");
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur :', error);
      }
    );
  }

  selectImage(image:string){
    let source = "../../assets/images/"+image
    this.user.image = source
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

  checkLoginInfo(){
    this.usersBackService.getUserByUsername(this.identifitant).subscribe(
      (user: User) => {
        if(user.mdp === this.motDePasse){
          this.enregistreIdLocalStorage(user._id,user.nom_utilisateur)
          this.login()
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  enregistreIdLocalStorage(userId:string,username:string){
    localStorage.clear()
    localStorage.setItem('userId',userId)
    localStorage.setItem('username',username)
  }

}
