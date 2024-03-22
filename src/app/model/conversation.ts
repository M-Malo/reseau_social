import { Optional } from "@angular/core";
import { User } from "./user";
import { Message } from "./message";

export class Conversation {
    _id: string;
    id_user1: string;
    id_user2: string;
    dernier_message?: Message;
    otherUser?: User;

    constructor(_id: string, id_user1: string, id_user2: string) {
        this._id = _id;
        this.id_user1 = id_user1;
        this.id_user2 = id_user2;
    }
}