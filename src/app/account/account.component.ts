import { Component } from '@angular/core';
import { User } from '../model/user';
import { Event } from '../model/event';
import { UsersBackService } from '../users-back.service';
import { EventsBackService } from '../events-back.service';
import { FavorisBackService } from '../favoris-back.service';
import { Favori } from '../model/favori';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  nbEventFavoris: number = 0
  utilisateur: User = new User("0","Username","mail","password","nom","prenom","2000-01-01",false, "image")
  eventList : String[] = [];


  constructor(private userBackservice: UsersBackService, private eventBackservice: EventsBackService, private favorisBackService: FavorisBackService) {
    if(localStorage.getItem("userId")){
      let userId: string = JSON.stringify(localStorage.getItem("userId"))
      let username: string = JSON.stringify(localStorage.getItem("username"))
      userId = userId.split('"')[1]
      username = username.split('"')[1]
      console.log(userId)
      this.getUser(userId);
      this.getEvents(userId);
      this.getNbFavori(userId);
    }
  }

  logValueDate() {
    console.log(this.utilisateur.date_naissance)
  }

  async getUser(userId:string) {

    (await this.userBackservice.getUserById(userId)).subscribe(
      (user: User) => {
        this.utilisateur = user;
        console.log(this.utilisateur);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      }
    );
  }

  async getEvents(userId:string) {

    (await this.eventBackservice.getEventsByUser(userId)).subscribe(
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
        localStorage.removeItem("username");
        localStorage.setItem("username", this.utilisateur.nom_utilisateur)
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'édition de l\'utilisateur :', error);
      }
    );
  }

  async getNbFavori(userId:string) {

    (await this.favorisBackService.getFavorisByUser(userId)).subscribe(
      (favoris: Favori[]) => {
        this.nbEventFavoris = favoris.length;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de favoris :', error);
      }
    );
  }
}
