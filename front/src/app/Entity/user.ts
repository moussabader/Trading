import { Portfolio } from './portfolio';
import { Role } from './role';

export class User {
    id!: number;                // Identifiant de l'utilisateur
    email!: string;             // Adresse email de l'utilisateur
    fullname!: string;          // Nom d'utilisateur
    password!: string;          // Mot de passe
    roles!: Role[];         // Rôle de l'utilisateur (tableau d'objets Role_User)
    rank!: number;              // Rang de l'utilisateur
    portfolio!: Portfolio;      // Portefeuille associé à l'utilisateur
    accountLocked!: boolean;
    enabled!: boolean;
    createdDate!: Date;          
    lastModifiedDate!: Date;
    // Ajoutez des propriétés optionnelles si nécessaire
    // registrationDate?: string; 
    // enabled?: boolean; 
    // imageName?: string;
}
