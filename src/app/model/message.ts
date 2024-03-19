
export class Message {
    idMessage: number;
    idConversation: number;
    idUser: number;
    contenu: string;
    date: string;

    constructor(idMessage: number, idConversation: number, idUser: number, contenu:string, date: string) {
        this.idMessage = idMessage;
        this.idConversation = idConversation;
        this.idUser = idUser;
        this.contenu = contenu;
        this.date = date;

    }

    
}