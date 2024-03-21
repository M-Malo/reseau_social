
export class Conversation {
    _id: number;
    id_user1: number;
    id_user2: number;

    constructor(_id: number, id_user1: number, id_user2: number) {
        this._id = _id;
        this.id_user1 = id_user1;
        this.id_user2 = id_user2;
    }
}