export class User{
    _id: string;
    nom_utilisateur: string;
    mail: string;
    mdp: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    admin: boolean;
    image: string

    constructor(_id: string, nom_utilisateur: string, mail: string, mdp: string, nom: string, prenom: string, date_naissance: string, admin: boolean, image: string) {
        this._id = _id;
        this.nom_utilisateur = nom_utilisateur;
        this.mail = mail;
        this.mdp = mdp;
        this.nom = nom;
        this.prenom = prenom;
        this.date_naissance = date_naissance;
        this.admin = admin;
        this.image = image;
    }
    
}