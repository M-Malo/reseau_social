
export class Message {
    _id: number;
    id_conversation: number;
    id_user: number;
    contenu: string;
    date_envoi: string;

    constructor(_id: number, id_conversation: number, id_user: number, contenu:string, date_envoi: string) {
        this._id = _id;
        this.id_conversation = id_conversation;
        this.id_user = id_user;
        this.contenu = contenu;
        this.date_envoi = date_envoi;

    }

    
}