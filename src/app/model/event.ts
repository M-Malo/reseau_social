
export class Event {
    IdEvent: number;
    IdCreateur: number;
    Nom: string;
    Theme: number;
    Image: string;
    Prix: number;
    Date: string;
    Description: string;

    constructor(IdEvent: number, IdCreateur: number, Nom: string, Theme: number, Image: string, Prix: number, Date: string, Description: string) {
        this.IdEvent = IdEvent;
        this.IdCreateur = IdCreateur;
        this.Nom = Nom;
        this.Theme = Theme;
        this.Image = Image;
        this.Prix = Prix;
        this.Date = Date;
        this.Description = Description;
    }

    
}