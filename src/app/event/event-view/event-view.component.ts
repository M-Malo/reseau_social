import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationsBackService } from 'src/app/conversations-back.service';
import { EventsBackService } from 'src/app/events-back.service';
import { FavorisBackService } from 'src/app/favoris-back.service';
import { Event } from 'src/app/model/event';
import { Favori } from 'src/app/model/favori';
import { User } from 'src/app/model/user';
import { UsersBackService } from 'src/app/users-back.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {
  event = new Event("","","Anniversaire",3,"../../../assets/images/poolparty.jpg",5,"2024-02-28","Salut Salut, on va feter mon anniv à la casa avec les copaings, Venez nombreux cela va etre sper sympas. N’oubliez pas de venir avec un SAM")
  id: string = "0";
  listeFavoris: string[] = [];
  userId: string = "";
  username: string = "";
  estOrganisateur = false;


  constructor(private route: ActivatedRoute, private router: Router, private eventBackservice: EventsBackService, private favoriBackService: FavorisBackService, private usersBackService : UsersBackService, private conversationsBackService: ConversationsBackService) {
    if(localStorage.getItem("userId")){
      this.userId = JSON.stringify(localStorage.getItem("userId"))
      this.username = JSON.stringify(localStorage.getItem("username"))
      this.userId = this.userId.split('"')[1]
      this.username = this.username.split('"')[1]
      console.log(this.userId)
      console.log(this.event.id_organisateur)
      console.log(this.estOrganisateur)

    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupère l'ID de l'URL
    });
    this.getEvent();
    this.getFavorisByEvent();
  }

  navigate(){
    let url = "/eventForm"
    this.router.navigateByUrl(url);
    this.router.navigate([url,this.id]);
  }

  navigateToConversation(){
    let url = "/conversation"
    this.router.navigateByUrl(url);
  }

  async clickCreateConversation(usernameOther: String) {
    
    (await this.usersBackService.getUserByUsername(usernameOther)).subscribe(
      async (user: User) => {
        console.log("L'utilisateur à été récupéré avec succès.");
        let newConversation = {id_user1: this.userId, id_user2: user._id};
        (await this.conversationsBackService.addConversation(newConversation)).subscribe(
          () => {
            console.log("La conversation a été créée avec succès.");
            this.navigateToConversation();
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la création de la conversation :', error);
          }
        );
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération de l\'utilisateur :', error);
      }
    );
    
  }

  async addFavori() {
    let newFavori = {id_event: this.id, id_user: this.userId};
    (await this.favoriBackService.addFavori(newFavori)).subscribe(
      () => {
        console.log("Le favori a été ajouté avec succès.");
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout du favori :', error);
      }
    );
  }

  async deleteFavori() {
    let newFavori = {id_event: this.id, id_user: this.userId};
    (await this.favoriBackService.deleteFavori(newFavori)).subscribe(
      () => {
        console.log("Le favori a été supprimé avec succès.");
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression du favori :', error);
      }
    );
  }

  async getEvent() {

    (await this.eventBackservice.getEventById(this.id)).subscribe(
      (event: Event) => {
        this.event = event;
        console.log(this.event);
        if(this.userId == this.event.id_organisateur){
          this.estOrganisateur = true
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération de l\'événement :', error);
      }
    );
  }

  
  async getFavorisByEvent() {

    (await this.favoriBackService.getFavorisByEvent(this.id)).subscribe(
      async (favoris: Favori[]) => {
        for (let favori of favoris) {
          (await this.usersBackService.getUserById(favori.id_user)).subscribe(
            async (user : User) => {
              this.listeFavoris.push(user.nom_utilisateur);
            }
          )
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des favoris :', error);
      }
    );
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
