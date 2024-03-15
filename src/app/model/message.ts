
export class Message {
    idMessage: number;
    idConversation: number;
    idUser: number;
    contenu: string;
    date: Date;

    constructor(idMessage: number, idConversation: number, idUser: number, contenu:string, date: Date) {
        this.idMessage = idMessage;
        this.idConversation = idConversation;
        this.idUser = idUser;
        this.contenu = contenu;
        this.date = date;

    }

    
}