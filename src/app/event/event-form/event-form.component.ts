import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  event = new Event(0,0,"",0,"",0,"2024-02-28","")
  id = -1
  feteSelect = false
  proSelect = false
  teamSelect = false
  sportSelect = false

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        //GetEventById
        this.event = new Event(this.id,0,"Pizza party",1,"../../assets/images/team.jpg",4,"2024-05-25","Pizza toute la night et console avec les boys")
      }
    });
  }

  selectImage(image:string){
    let source = "../../assets/images/"+image
    this.event.Image = source
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
