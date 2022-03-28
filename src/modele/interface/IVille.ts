/**
 * Interface ville
 */
import {ILieu} from "./ILieu";

export interface IVille {

  id : number;
  nom : string;
  codePostal : string;
  lieux? : ILieu[];


}
