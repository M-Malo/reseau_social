import { Component } from '@angular/core';
import { User } from '../model/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  nbEventFavoris:number = 5
  utilisateur:User = new User("0","Username","mail","password","nom","prenom",new Date(),false)
  bday:Date = new Date
  eventList = ["Bowling entre copaing","Laser Game","Anniversaire a la casa avec tous les copains du monde entier !!"]


  constructor() {
    this.utilisateur = new User("0","M-Malo","malo.guetto@isen-ouest.yncrea.fr","123poulet","Guetto","Malo",new Date(),true)

    //La date ne marche pas, je comprend pas
    const jour = this.utilisateur.dateDeNaissance.getDate()
    const mois = this.utilisateur.dateDeNaissance.getMonth()
    const annee = this.utilisateur.dateDeNaissance.getFullYear()
    console.log(annee)
    this.bday.setFullYear(annee)
    this.bday.setDate(jour)
    this.bday.setMonth(mois)
  }

  logValueDate() {
    console.log(this.bday.getFullYear())
  }
}
