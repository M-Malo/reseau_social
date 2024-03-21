import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {
  event = new Event(0,0,"Anniversaire",3,"../../../assets/images/poolparty.jpg",5,"2024-02-28","Salut Salut, on va feter mon anniv à la casa avec les copaings, Venez nombreux cela va etre sper sympas. N’oubliez pas de venir avec un SAM")
  id: string = "0";
  listeFavoris: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.listeFavoris = ["Sharigan","M-Malo","Bernardo","Djamel"]
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupère l'ID de l'URL
    });
  }

  navigate() {
    const url = "eventForm"
    this.router.navigateByUrl(url);
    this.router.navigate([url, this.id]);
  }
}
