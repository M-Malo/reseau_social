import { Component } from '@angular/core';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {
  event = new Event(0,0,"Anniversaire",3,"../../../assets/images/poolparty.jpg",5,new Date(),"Salut Salut, on va feter mon anniv à la casa avec les copaings, Venez nombreux cela va etre sper sympas. N’oubliez pas de venir avec un SAM")
}
