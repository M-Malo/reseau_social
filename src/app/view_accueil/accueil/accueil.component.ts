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
  themeEvent: string = "-1";
  prixMaxEvent = 50;
  nomEvent = "";
  //filtres = {prixMaxEvent: 50, nomEvent: "", themeEvent: -1}


  constructor(private eventBackservice: EventsBackService, private router: Router) {
    this.getEvents();
  }

  getEvents() {

    this.eventBackservice.getEvents().subscribe(
      (events: Event[]) => {
        this.eventList = events;
        console.log(this.eventList);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  appliquerFiltre() {

    // Appel du service pour récupérer les événements filtrés
    this.eventBackservice.getEventsFiltred(this.prixMaxEvent, this.nomEvent, this.themeEvent).subscribe(
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
}
