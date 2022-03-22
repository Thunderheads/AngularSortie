/**
 * Interface lieu
 */
import {IVille} from "./IVille";

export interface ILieu {
  [Symbol.iterator](): IterableIterator<ILieu>;
  id : number;
  nom : string;
  rue : string;
  latitude : number;
  longitude : number;
  ville : IVille;
}
