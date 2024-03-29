export class Message {
    json(): any {
      throw new Error('Method not implemented.');
    }
    _id: string;
    id_conversation: string;
    id_user: string;
    name_user: string;
    contenu: string;
    date_envoi: string;

    constructor(_id: string, id_conversation: string, id_user: string, name_user: string, contenu: string, date_envoi: string) {
        this._id = _id;
        this.id_conversation = id_conversation;
        this.id_user = id_user;
        this.name_user = name_user;
        this.contenu = contenu;
        this.date_envoi = date_envoi;
    }


}
