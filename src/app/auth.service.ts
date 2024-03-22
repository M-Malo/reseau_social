import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new Boolean

  constructor(){
    let userId: string = JSON.stringify(localStorage.getItem("userId")).split('"')[1]
    if(userId){   //l'utilisateur est toujours connecté
      this.isLoggedIn = true;
    }else {
      this.isLoggedIn = false;
    }
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
