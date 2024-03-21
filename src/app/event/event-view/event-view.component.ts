import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsBackService } from 'src/app/events-back.service';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {
  event = new Event("","","Anniversaire",3,"../../../assets/images/poolparty.jpg",5,"2024-02-28","Salut Salut, on va feter mon anniv à la casa avec les copaings, Venez nombreux cela va etre sper sympas. N’oubliez pas de venir avec un SAM")
  id: string = "0";

  constructor(private route: ActivatedRoute, private eventBackservice: EventsBackService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupère l'ID de l'URL
    });
    this.getEvent();
  }

  getEvent() {

    this.eventBackservice.getEventById(this.id).subscribe(
      (event: Event) => {
        this.event = event;
        console.log(this.event);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération de l\'événement :', error);
      }
    );
  }
}
