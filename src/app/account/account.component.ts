import { Component } from '@angular/core';
import { User } from '../model/user';
import { Event } from '../model/event';
import { UsersBackService } from '../users-back.service';
import { EventsBackService } from '../events-back.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  nbEventFavoris: number = 5
  utilisateur: User = new User("0","Username","mail","password","nom","prenom","2000-01-01",false, "image")
  eventList : String[] = [];
  //eventList = ["Bowling entre copaing","Laser Game","Anniversaire a la casa avec tous les copains du monde entier !!"]


  constructor(private userBackservice: UsersBackService, private eventBackservice: EventsBackService) {
    //this.utilisateur = new User("0","M-Malo","malo.guetto@isen-ouest.yncrea.fr","123poulet","Guetto","Malo","2001-02-28",true, "image")
    if(localStorage.getItem("userId")){
      let userId: string = JSON.stringify(localStorage.getItem("userId"))
      let username: string = JSON.stringify(localStorage.getItem("username"))
      userId = userId.split('"')[1]
      username = username.split('"')[1]
      console.log(userId)
      this.getUser(userId);
      this.getEvents(userId);
    }
  }

  logValueDate() {
    console.log(this.utilisateur.date_naissance)
  }

  async getUser(userId:string) {

    (await this.userBackservice.getUserById(userId)).subscribe( //TODO comment récupérer userId ??
      (user: User) => {
        this.utilisateur = user;
        console.log(this.utilisateur);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  async getEvents(userId:string) {

    (await this.eventBackservice.getEventsByUser(userId)).subscribe( //TODO comment récupérer userId ??
      (events: Event[]) => {
        console.log(events)
        for (let event of events) {
          this.eventList.push(event.nom);
        }
        console.log(this.eventList);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }
  async updateInfoUser() {
    (await this.userBackservice.updateUser(this.utilisateur)).subscribe(
      () => {
        console.log("L'utilisateur a été modifié avec succès.");
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur :', error);
      }
    );
  }

  
}
