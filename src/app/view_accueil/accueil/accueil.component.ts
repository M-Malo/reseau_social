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
  userConnected: string = "M-Malo"
  eventList: Event[] = []
  prixMax = 50
  // prixFiltre:number = 0
  // nomEvent:string = ""
  // theme:number = 0
  filtre = {prixMaxEvent: 0, nomEvent: "", themeEvent: null}


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

  appliquerFiltre(){
    console.log(this.filtre);
    // this.eventBackservice.getEventsFiltred(this.filtre).subscribe(
    //   (events: Event[]) => {
    //     this.eventList = events;
    //     console.log(this.eventList);
    //   },
    //   (error) => {
    //     console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
    //   }
    // );
  }

  navigateTo(idEvent: string) {
    const url = "eventDetail"
    this.router.navigateByUrl(url);
    this.router.navigate([url, idEvent]);
  }
}
