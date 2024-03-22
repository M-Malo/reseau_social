import { Component } from '@angular/core';
import { Event } from '../../model/event';
import { Router } from '@angular/router';
import { EventsBackService } from 'src/app/events-back.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent{
  userConnected: string = "M-Malo";
  eventList: Event[] = [];
  filtre = {prixMaxEvent : 50, nomEvent : "", themeEvent: "-1"}

  constructor(private eventBackservice: EventsBackService, private router: Router) {
    this.getEvents();
  }

  async getEvents() {

    (await this.eventBackservice.getEvents()).subscribe(
      (events: Event[]) => {
        this.eventList = events;
        console.log(this.eventList);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  async appliquerFiltre() {

    // Appel du service pour récupérer les événements filtrés
    (await this.eventBackservice.getEventsFiltered(this.filtre.prixMaxEvent, this.filtre.nomEvent, this.filtre.themeEvent)).subscribe(
      (events: Event[]) => {
        this.eventList = events;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements filtrés:', error);
      }
    );
  }

  navigateTo(idEvent: string) {
    const url = "eventDetail"
    this.router.navigateByUrl(url);
    this.router.navigate([url, idEvent]);
  }

  idEventToTheme(idEvent:number){
    let theme = 'Autre'
    switch (idEvent) {
      case 0:
        theme = 'Sport'
        break;
      case 1:
        theme = 'Culture'
        break;
      case 2:
        theme = 'Festif'
        break;
      case 3:
        theme = 'Pro'
        break;
    }
    return theme
  }
}
