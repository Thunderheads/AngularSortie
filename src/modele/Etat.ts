import {Sortie} from "./Sortie";

export class Etat{

  private _idEtat : number;
  private _libelle : string;
  private sorties : Sortie[];



  get idEtat(): number {
    return this._idEtat;
  }

  set idEtat(value: number) {
    this._idEtat = value;
  }

  get libelle(): string {
    return this._libelle;
  }

  set libelle(value: string) {
    this._libelle = value;
  }
}
