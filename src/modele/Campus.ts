import {Sortie} from "./Sortie";
import {Participant} from "./Participant";

export class Campus{

  private _idCampus : number;
  private _nom : string;
  private lstSortie : Sortie[];
  private lstParticipant : Participant[];


  get idCampus(): number {
    return this._idCampus;
  }

  set idCampus(value: number) {
    this._idCampus = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

}
