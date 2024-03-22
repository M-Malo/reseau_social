export class Favori{
    _id?: string;
    id_event: string;
    id_user: string;

    constructor(id_event: string, id_user: string) {
        this.id_event = id_event;
        this.id_user = id_user;
    }
}