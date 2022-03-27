import {ISortie} from "./ISortie";
import {ICampus} from "./ICampus";

export interface IUser{
  [Symbol.iterator](): IterableIterator<IUser>;
  id : number;
  nom : string;
  prenom : string;
  telephone : string;
  mail : string;
  actif : boolean;
  campus : ICampus[];
}
