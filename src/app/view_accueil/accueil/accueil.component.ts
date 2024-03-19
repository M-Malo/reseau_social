import { Component } from '@angular/core';
import { Event } from '../../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  userConnected: string = "M-Malo"
  eventList: Event[] = []
  prixMax = 50
  prixFiltre:number = 0

  constructor(private router: Router) {
    let event1:Event = new Event(0,0,"Pool party",2,"none",10,"2024-04-04","Ca va venir a la piscine ou quoi")
    let event2:Event = new Event(1,1,"bowling",2,"none",25,"2023-05-25","Ca va venir a la bowling ou quoi")
    this.eventList.push(event1)
    this.eventList.push(event2)
    this.eventList.push(event1)
    this.eventList.push(event2)
  }

  appliquerFiltre(){
    this.prixMax = this.prixFiltre
  }

  navigateTo(idEvent: number) {
    const url = "eventDetail"
    const id = String(idEvent)
    this.router.navigateByUrl(url);
    this.router.navigate([url, id]);
  }
}
