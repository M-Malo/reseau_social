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
  event = new Event("65fadeacb1072c2526f04e81", JSON.stringify(localStorage.getItem('userId')).split('"')[1],"",0,"",0,"2024-02-28","")
  edition = false
  erreurNom = false
  erreurDate = false
  erreurDesc = false
 

  constructor(private eventsBackService: EventsBackService, private route: ActivatedRoute) { }

  id = ""
  feteSelect = true
  proSelect = false
  teamSelect = false
  sportSelect = false


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.getEventById(this.id)
        this.edition = true
      }
    });
  }

  async submitEvent() {
    console.log(this.event);
    if(this.verificationInput()){
      (await this.eventsBackService.addEvent(this.event)).subscribe(
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
  }

  async updateEvent() {
    (await this.eventsBackService.updateEvent(this.event)).subscribe(
      () => {
        console.log("L'événement a été édité avec succès.");
        // Réinitialiser le formulaire après l'ajout réussi
        this.event = new Event("", "","",0,"",0,"2024-02-28","");
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'édition de l\'événement :', error);
      }
    );
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

  async getEventById(id:string) {

    (await this.eventsBackService.getEventById(id)).subscribe(
      (event: Event) => {
        console.log(this.event);
        this.event = event
        this.selectImage(this.event.image.split('/')[4]);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  selectTheme(idTheme:number) {
    this.event.theme = idTheme
  }

  verificationInput(){
    let valide = true
    this.erreurNom = false
    this.erreurDate = false
    this.erreurDesc = false
    if(this.event.nom === ""){
      this.erreurNom = true
      valide = false
    }
    if(this.event.date_event === ""){
      this.erreurDate = true
      valide = false
    }
    if(this.event.description === ""){
      this.erreurDesc = true
      valide = false
    }
    console.log(this.event.prix)
    return valide
  }
  

}
