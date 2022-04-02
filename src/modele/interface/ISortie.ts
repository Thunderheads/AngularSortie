/**
 * Interface en charge de typer les données reçues
 */
import {IUser} from "./IUser";
import {IEtat} from "./IEtat";

export interface ISortie {
  [Symbol.iterator](): IterableIterator<ISortie>;
  id : number,
  nom : string,
  dateHeureDebut : Date,
  etat : IEtat
  duree : number,
  dateLimiteInscription : Date,
  nbInscriptionsMax : number,
  infosSortie : string,
  participants? : IUser[],
  organisateur : IUser

}

