export class User{
    idUser: string;
    username: string;
    mail: string;
    password: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
    admin: boolean;
    image: string

    constructor(idUser: string, username: string, mail: string, password: string, nom: string, prenom: string, dateDeNaissance: string, image:string, admin: boolean) {
        this.idUser = idUser;
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.dateDeNaissance = dateDeNaissance;
        this.admin = admin;
        this.image = image;
    }
    
}