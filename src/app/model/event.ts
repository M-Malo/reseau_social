
export class Event {
    _id: string;
    id_organisateur: string;
    nom: string;
    theme: number;
    image: string;
    prix: number;
    date_event: string;
    description: string;

    constructor(IdEvent: string, id_organisateur: string, nom: string, theme: number, image: string, prix: number, date_event: string, description: string) {
        this._id = IdEvent;
        this.id_organisateur = id_organisateur;
        this.nom = nom;
        this.theme = theme;
        this.image = image;
        this.prix = prix;
        this.date_event = date_event;
        this.description = description;
    }

    
}