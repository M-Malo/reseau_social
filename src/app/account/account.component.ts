import { Component } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  nbEventFavoris:number = 5
  utilisateur:User = new User("0","Username","mail","password","nom","prenom","2000-01-01",false)
  eventList = ["Bowling entre copaing","Laser Game","Anniversaire a la casa avec tous les copains du monde entier !!"]


  constructor() {
    this.utilisateur = new User("0","M-Malo","malo.guetto@isen-ouest.yncrea.fr","123poulet","Guetto","Malo","2001-02-28",true)
  }

  logValueDate() {
    console.log(this.utilisateur.dateDeNaissance)
  }
}
