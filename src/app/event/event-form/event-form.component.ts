import { Component } from '@angular/core';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  event = new Event(0,0,"",0,"",0,"2024-02-28","")
}
