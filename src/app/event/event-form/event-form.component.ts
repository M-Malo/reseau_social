import { Component } from '@angular/core';
import { EventsBackService } from 'src/app/events-back.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  event = new Event("eventId", "65fadeacb1072c2526f04e82","",0,"",0,"2024-02-28","")

  constructor(private eventsBackService: EventsBackService, private route: ActivatedRoute) { }

  submitEvent() {
    console.log(this.event);
    this.eventsBackService.addEvent(this.event).subscribe(
      () => {
        console.log("L'événement a été ajouté avec succès.");
        // Réinitialiser le formulaire après l'ajout réussi
        this.event = new Event("", "","",0,"",0,"2024-02-28","");
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de l\'événement :', error);
      }
    );
  }
  id = ""
  feteSelect = false
  proSelect = false
  teamSelect = false
  sportSelect = false


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        //GetEventById
        this.event = new Event(this.id,"","Pizza party",1,"../../assets/images/team.jpg",4,"2024-05-25","Pizza toute la night et console avec les boys")
      }
    });
  }

  selectImage(image:string){
    let source = "../../assets/images/"+image
    this.event.image = source
    this.feteSelect = false
    this.proSelect = false
    this.teamSelect = false
    this.sportSelect = false
    
    switch (image) {
      case 'fete.jpg':
        this.feteSelect = true
        break;
      case 'pro.jpg':
        this.proSelect = true
        break;
      case 'sport.jpg':
        this.sportSelect = true
        break;
      case 'team.jpg':
        this.teamSelect = true
        break;
    }
  }
  

}
